import Baobab from 'baobab';
import {
    HELLO_WORLD
    } from 'app/constants/';

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

    tree.set(HELLO_WORLD, {});

    return viewFacet;
}