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

/** Import debug script for dev mode */
// Comment out when building for prod
import './debug-mode';