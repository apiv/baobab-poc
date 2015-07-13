import Baobab from 'baobab';
import {
    HELLO_WORLD,
    RELEVANT,
    SAVE,
    REVERT
    } from 'app/constants/';

import {
    requestService,
    saveService,
    revertService
    } from './hello-world-service';

var defaults = {
    active: false,
    message: ''
};

/**
 * @param {Baobab} tree
 * @returns {Baobab.Facet} viewFacet
 */
export default function helloWorldFacet(tree) {
    var viewCursor = tree.select(HELLO_WORLD);

    var viewFacet = new Baobab.Facet(tree, {
        cursors: { viewCursor },
        facets: {}
    });

    viewCursor.on(RELEVANT, ()=> requestService(viewCursor));
    viewCursor.on(SAVE, ()=> saveService(viewCursor));
    viewCursor.on(REVERT, ()=> revertService(viewCursor));

    viewCursor.set(defaults);

    return viewFacet;
}