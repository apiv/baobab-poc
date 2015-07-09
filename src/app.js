import appTree from 'app/app-tree/';

import commandBar from 'app/command-bar/';
import helloWorld from 'app/hello-world/';

import { Mediator } from 'lib/mediator/';
import DOMDelegator from 'dom-delegator';

import { HELLO_WORLD } from 'app/constants/';
import { CREATED } from 'lib/constants/';

new DOMDelegator;

function bootstrap(container) {
    var mediator = new Mediator;

    mediator
        .addComponent(helloWorld(appTree))
        .addComponent(commandBar(appTree))
        .addHandlers();

    Object.keys(mediator.components).forEach(function (key) {
        let component = mediator.components[key];
        component.on(CREATED, ()=> container.appendChild(component.root));
    });
}

bootstrap(document.getElementById('app'));

/** Import debug script for dev mode */
// Comment out when building for prod
import './debug-mode';