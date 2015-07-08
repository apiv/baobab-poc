import appTree from 'app/app-tree/';

import helloWorldFacet from 'app/hello-world/hello-world-facet';
import helloWorldView from 'app/hello-world/hello-world-view';
import helloWorldInteractions from 'app/hello-world/hello-world-interactions';

import commandBarFacet from 'app/command-bar/command-bar-facet';
import commandBarView from 'app/command-bar/command-bar-view';
import commandBarInteractions from 'app/command-bar/command-bar-interactions';

import { Mediator } from 'lib/mediator/';
import DOMDelegator from 'dom-delegator';

import { HELLO_WORLD } from 'app/constants/';
import { CREATED } from 'lib/constants/';

new DOMDelegator;

function bootstrap(container) {
    var mediator = new Mediator;

    mediator
        .addComponent(helloWorldInteractions(helloWorldView(helloWorldFacet(appTree))))
        .addComponent(commandBarInteractions(commandBarView(commandBarFacet(appTree))))
        .addHandlers();

    Object.keys(mediator.components).forEach(function (key) {
        let component = mediator.components[key];
        component.on(CREATED, ()=> container.appendChild(component.root));
    });
}

bootstrap(document.getElementById('app'));

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
            console.log(`%c ${source} %c ${sourceEvent} %c=> %c ${target} %c ${targetEvent}`, 'background:#6E6E6E;color:#fff;', 'background:none;color:#6E6E6E;', 'color:#000;', 'background:#F58000;color:#fff;','background:none;color:rgb(20,122,0);', data);
        } else {
            console.log(`%c ${target} %c ${targetEvent}`, 'background:#F58000;color:#fff;', 'background:none;color:rgb(20,122,0);', data);
        }
    });