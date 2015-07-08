import Baobab from 'baobab';
import warn from 'lib/warn/';
import { wrap } from 'lib/aop/';
import { View } from 'lib/view/';

/**
 * Ensure that all events follow the convention
 */
wrap(View, 'prototype.emit')
    .before(function (data) {
        let args = Array.prototype.slice.call(data.arguments, 1);
        let e = args[0];
        let source = args[1];

        if (typeof e !== 'object') {
            warn('MalformedEvent', 'Argument 1 (event) must be an object', data)
        }
        if (!e.source || !e.target || !e.targetEvent) {
            warn('MalformedEvent', 'Argument 1 (event) must have properties "source", "target", and "targetEvent"', data)
        }
        if (typeof source !== 'string') {
            warn('MalformedEvent', 'Argument 2 (source) must be a string', data)
        }
    });

/**
 * Log all events and interactions
 */
wrap(View, 'prototype.emit')
    .before(function (data) {
        let args = Array.prototype.slice.call(data.arguments, 1);
        let { source, sourceAction, target, targetEvent } = args[0];

        if (sourceAction && (source != target)) {
            let sourceEvent = sourceAction.split('#')[1];
            console.log(`%c ${source} %c ${pad(sourceEvent, 30 + (11 - source.length))} %c-> %c ${target} %c ${pad(targetEvent, 30 + (11 - target.length))}`, 'background:#6E6E6E;color:#fff;', 'background:none;color:#6E6E6E;', 'color:#0097A9;', 'background:#F58000;color:#fff;', 'background:none;color:rgb(20,122,0);', data);
        } else {
            console.log(`%c ${target} %c ${pad(targetEvent, 30 + (11 - target.length))}`, 'background:#F58000;color:#fff;', 'background:none;color:rgb(20,122,0);', data);
        }
    });

function pad(str, len) {
    if (str.length > len) {
        return str;
    } else {
        return (str + "                                                            ").slice(0, len);
    }
}