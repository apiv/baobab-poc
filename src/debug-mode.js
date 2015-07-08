/**
 * Import this file into app.js to enable debugging
 */

import appTree from 'app/app-tree/';

/** Debug -- expose appTree */
window.appTree = appTree;

/** Debug -- wrap EventEmitter */
import { View } from 'lib/view/';
import { wrap } from 'lib/aop/';

wrap(View, 'prototype.emit')
    .before(function (data) {
        let args = Array.prototype.slice.call(data.arguments, 1);
        let { source, sourceAction, target, targetEvent } = args[0];

        if (sourceAction && (source != target)) {
            let sourceEvent = sourceAction.split('#')[1];
            console.log(`%c ${source} %c ${pad(sourceEvent, 30+(11-source.length))} %c-> %c ${target} %c ${pad(targetEvent, 30+(11-target.length))}`, 'background:#6E6E6E;color:#fff;', 'background:none;color:#6E6E6E;', 'color:#0097A9;', 'background:#F58000;color:#fff;','background:none;color:rgb(20,122,0);', data);
        } else {
            console.log(`%c ${target} %c ${pad(targetEvent, 30+(11-target.length))}`, 'background:#F58000;color:#fff;', 'background:none;color:rgb(20,122,0);', data);
        }
    });

function pad(str, len) {
    if (str.length > len) {
        return str;
    } else {
        return (str+"                                                            ").slice(0,len);
    }
}