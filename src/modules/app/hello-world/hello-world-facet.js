import {
    HELLO_WORLD
    } from 'app/constants';

/**
 * @param {Baobab} tree
 * @returns {Baobab.Facet} viewFacet
 */
export default function helloWorldFacet(tree) {
    var viewCursor = tree.get(HELLO_WORLD);

    var viewFacet = new Baobab.Facet(tree, {
        cursors: { viewCursor },
        facets: {}
    });

    return viewFacet;
}