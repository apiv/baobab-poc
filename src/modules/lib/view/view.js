import { CREATED,
    INTERACTION_SEPARATOR,
    ACTION_SEPARATOR,
    EVENT_SEPARATOR,
    EMPTY } from 'lib/constants/';
import util from 'util';
import events from 'events';
import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';

import DOMDelegator from 'dom-delegator';
new DOMDelegator();

/**
 * A node in the DOM tree.
 *
 * @external Node
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node Node}
 */

/**
 * A virtual node tree.
 *
 * @external VirtualNode
 * @see {@link https://github.com/Matt-Esch/virtual-dom}
 */

/**
 * @implements {EventEmitter}
 * @property root {external:Node}
 * @property tree {external:VirtualNode}
 * @returns {View}
 * @constructor
 */
export function View(namespace) {
    if (!(this instanceof View)) {
        return new View(namespace);
    }
    this.namespace = namespace;
    this.interactions = [];
    this.root = null;
    this.tree = null;
    this.focusing = null;
    events.EventEmitter.call(this);
}

util.inherits(View, events.EventEmitter);

/**
 * Renders a virtual tree into a dom node
 * @fires View#created {external:Node}
 * @param {VNode} tree
 * @param {Object=} options
 * @param {Boolean=true} options.patch if false, the element will be replaced instead of patched
 * @returns {View}
 */
View.prototype.render = function (tree, options) {
    options = options || {};
    var patches = this.tree && diff(this.tree, tree);
    if (!this.root) {
        this.root = createElement(tree);
        this.emit(CREATED, {
            source: this.namespace,
            target: this.namespace,
            targetEvent: CREATED
        }, this.namespace, this.root);
    } else {
        if (options.patch === false && this.root.parentNode) {
            var newRoot = createElement(tree);
            this.root.parentNode.replaceChild(newRoot, this.root);
            this.root = newRoot;
        } else {
            patch(this.root, patches);
        }
    }
    this.tree = tree;
    return this;
};

/**
 * Interactions are concatenations of two actions separated by `->`
 * @param src {string}
 * @param srcE {string|Array}
 * @param tar {string}
 * @param tarE {string|Array}
 * @returns {View}
 */
View.prototype.addFullInteraction = function (src, srcE, tar, tarE) {
    var e1 = this.parseEvent(srcE);
    var e2 = this.parseEvent(tarE) || e1;
    var action = this.formatInteraction([src, e1], [tar, e2]);
    if (this.interactions.indexOf(action) === -1) {
        this.interactions.push(action);
    }
    return this;
};

/**
 * @param source {string}
 * @param sourceEvent {string|Array}
 * @param targetEvent {string|Array}
 * @returns {View}
 */
View.prototype.addInteraction = function (source, sourceEvent, targetEvent) {
    return this.addFullInteraction(source, sourceEvent, this.namespace, targetEvent);
};

/**
 * @param sourceEvent
 * @param target
 * @param targetEvent
 * @returns {View}
 */
View.prototype.addPushInteraction = function (sourceEvent, target, targetEvent) {
    return this.addFullInteraction(this.namespace, sourceEvent, target, targetEvent);
};

/**
 * Events may contain a subject/target and the verb separated by `:` but may not contain `#` or `->`
 * otherwise events are verbs
 * @param str {string|Array}
 * @returns {string|Array}
 */
View.prototype.parseEvent = function (str) {
    return str && str.split ? str.split(EVENT_SEPARATOR) : str;
};

/**
 * Actions are a namespace (noun) and an event separated by `#`
 * @param str {string|Array}
 * @returns {Array}
 */
View.prototype.parseAction = function (str) {
    return str && str.split ? str.split(ACTION_SEPARATOR) : str;
};

/**
 * @param args {string|Array}
 * @returns {string}
 */
View.prototype.formatEvent = function (args) {
    return args.join ? args.join(EVENT_SEPARATOR) : args;
};

/**
 * @param args {Array}
 * @returns {string}
 */
View.prototype.formatAction = function (args) {
    return [
        args[0],
        this.formatEvent(args[1])
    ].join(ACTION_SEPARATOR);
};

/**
 * @param source {Array}
 * @param target {Array}
 * @returns {string}
 */
View.prototype.formatInteraction = function (source, target) {
    return [
        this.formatAction(this.parseAction(source)),
        this.formatAction(this.parseAction(target))
    ].join(INTERACTION_SEPARATOR);
};

/**
 * focuses the specified element
 *
 * Note: this method stays with the view because focus is not something the view model cares about
 * @param id {string}
 */
View.prototype.focus = function (id) {
    clearTimeout(this.focusing);
    this.focusing = this.waitForElement(id, function (el) {
        el.focus();
    });
};

/**
 * Clicks the specified element
 *
 * @param id
 */
View.prototype.click = function (id) {
    clearTimeout(this.clicking);
    this.clicking = this.waitForElement(id, function (el) {
        el.click();
    });
};

/**
 * Waits for element
 * @param {String} id
 * @param {Function} res
 * @param {Function} err
 * @returns {Number} timeout
 */
View.prototype.waitForElement = function (id, res, err) {
    var self = this;
    return setTimeout(function () {
        var el = document.getElementById(id);

        if (
            el &&
            !($ && $.browser.msie && !$(el).is(':visible'))
        ) {
            res && res(el);
        } else {
            err && err(el);
        }
    }, 0);
};