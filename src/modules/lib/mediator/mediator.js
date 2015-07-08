/**
 * Interface for classes that represent a component.
 *
 * @interface Component
 */

/**
 * registers a topic and handler
 *
 * @memberof Component
 * @function
 * @name Component#on
 * @param {string} topic
 * @param {function} handler
 */

/**
 * trigger a registered handler
 *
 * @memberof Component
 * @function
 * @name Component#emit
 * @param {string} topic
 * @param {*} [data]
 */

/**
 * Get the color as an array of red, green, and blue values, represented as
 * decimal numbers between 0 and 1.
 *
 * @memberof Component
 * @name Component#namespace
 * @type {string}
 */

/**
 * Get the color as an array of red, green, and blue values, represented as
 * decimal numbers between 0 and 1.
 *
 * @memberof Component
 * @name Component#interactions
 * @type {string[]}
 */

const ARROW = '->';
const HASH = '#';
const EMPTY = '';
const SOURCE = 0;
const EVENT = 1;
const ACTION = 2;

function createHandler(mediator, source, event) {
    var sourceAction = source + HASH + event;
    var handler = mediator.handlers[sourceAction];
    if (!handler) {
        mediator.handlers[sourceAction] = function (e, eSource, eData) {
            var actions = mediator.getActions(source, event);
            actions.forEach(function (action) {
                var split = action.split(HASH);
                var target = split[0];
                var targetEvent = split[1];
                var tar = mediator.components[target];
                var e = {
                    source: source,
                    sourceAction: sourceAction,
                    target: target,
                    targetEvent: targetEvent
                };
                if (tar && tar.emit) {
                    tar.emit(targetEvent, e, eSource, eData);
                }
            });
        };
        return mediator.handlers[sourceAction];
    }
    return false;
}

/**
 * a module to allow communication between discrete components
 * using EventEmitters and a custom declarative syntax for
 * describing the interaction
 *
 * @module Mediator
 * @category function
 * @prop {object} components - registered components
 * @prop {object} interactions - registered interactions
 * @prop {object} handlers - generated handlers
 * @constructor
 */
export function Mediator() {
    this.components = {};
    this.interactions = {};
    this.handlers = {};
}

Mediator.prototype = {
    /**
     * register a component that implements Component
     *
     * @param {object} component
     * @param {string} [namespace=component.namespace]
     * @returns {Mediator}
     */
    addComponent: function (component, namespace) {
        var ns = (component && component.namespace) || namespace;
        if (ns) {
            this.components[ns] = component;
            this.addInteractions(component);
        }
        return this;
    },
    parseInteraction: function (interaction) {
        var splitAction = (interaction || EMPTY).split(ARROW);
        var sourceAction = splitAction[0] || EMPTY;
        var targetAction = splitAction[1] || EMPTY;
        var sourceSplit = sourceAction.split(HASH);
        var source = sourceSplit[0];
        var sourceEvent = sourceSplit[1];
        var targetSplit = targetAction.split(HASH);
        var target = targetSplit[0];
        var targetEvent = targetSplit[1];
        if (source && sourceEvent && target && targetEvent) {
            return [source, sourceEvent, targetAction];
        }
        return false;
    },
    addSource: function (source) {
        this.interactions[source] = this.interactions[source] || {};
        return this.interactions[source];
    },
    addSourceEvent: function (source, event) {
        source[event] = source[event] || [];
        return source[event];
    },
    addTargetAction: function (event, action) {
        if (event.indexOf(action) === -1) {
            event.push(action);
        }
    },
    /**
     * add a declarative interaction
     *
     * @param {string} interaction
     * @returns {Mediator}
     * @see https://github.com/Voya-Financial/mediator#interaction
     */
    addInteraction: function (interaction) {
        var parsed = this.parseInteraction(interaction);
        if (parsed) {
            this.addTargetAction(
                this.addSourceEvent(
                    this.addSource(
                        parsed[SOURCE]),
                    parsed[EVENT]),
                parsed[ACTION]);
        }
        return this;
    },
    /**
     * add all interactions of a component
     *
     * @param {object} component
     * @param {string[]} component.interactions
     * @returns {Mediator}
     * @see https://github.com/Voya-Financial/mediator#interaction
     */
    addInteractions: function (component) {
        var list = (component && component.interactions) || [];
        list.forEach(this.addInteraction, this);
        return this;
    },
    getSources: function () {
        return Object.keys(this.interactions);
    },
    getEvents: function (source) {
        return Object.keys(this.interactions[source]);
    },
    getActions: function (source, event) {
        return this.interactions[source][event];
    },
    /**
     * calls the source component#on method with the
     * source event as the topic and a lazy handler
     * which will find all destination components
     * and invoke destination#emit using the registered
     * destination event with the signature `event, sender, data`
     * where event is an object describing the parsed interaction,
     * the registered namespace of the sending component (this
     * is not an introdcution to the sender) and a single
     * data argument.
     *
     * @returns {Mediator}
     *
     * @example
     *
     * mediator
     *   .addComponent(source)
     *   .addComponent(destination)
     *   .addHandlers()
     */
    addHandlers: function () {
        var mediator = this;
        this.getSources().forEach(function (source) {
            var src = mediator.components[source];
            if (src && src.on) {
                mediator.getEvents(source).forEach(function (event) {
                    var handler = createHandler(mediator, source, event);
                    if (handler) {
                        src.on(event, handler);
                    }
                });
            }
        });
        return this;
    }
};