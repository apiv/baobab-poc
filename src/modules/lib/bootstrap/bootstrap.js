import { CREATED } from 'lib/constants/';
import { Mediator } from 'lib/mediator/';

/**
 * Instantiates components from factories, adds them into a mediator.
 * Places components on the DOM on create.
 *
 * @param {Baobab} appTree
 * @param {String} containerId
 * @param {Array<View|Array<View, String>>} componentFactories
 *
 * @example
 * Place all components in #app on the DOM
 *  bootstrap(appTree, 'app', [
 *      componentFactoryOne,
 *      componentFactoryTwo
 *  ])
 *
 * @example
 * Place one component in a child of #app, identified by #left
 * Place another component in a child of #app, identified by #right
 * Place a third component in #app
 *  bootstrap(appTree, 'app', [
 *      [componentFactoryOne, 'left'],
 *      [componentFactoryTwo, 'right],
 *      componentFactoryThree
 *  ])
 */
export default function bootstrap(appTree, containerId, componentFactories) {
    var mediator = new Mediator();

    componentFactories.forEach(function (config) {
        let factory = typeof config === 'function' ? config : config[0];
        let container = typeof config === 'function' ? containerId : config[1];
        var component = factory(appTree);
        mediator.addComponent(component);

        component.on(CREATED, function (e, source, root) {
            document.getElementById(container).appendChild(root);
        });
    });

    mediator.addHandlers();
}