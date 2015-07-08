import Baobab from 'baobab';
import {
    PRESSED,
    COMMAND_BAR,
    HELLO_WORLD
    } from 'app/constants/';

/**
 * @param {Baobab} tree
 * @returns {Baobab.Facet} viewFacet
 */
export default function helloWorldFacet(tree) {
    var viewCursor = tree.select(COMMAND_BAR);

    var viewFacet = new Baobab.Facet(tree, {
        cursors: { viewCursor },
        facets: {
            buttons: new Baobab.Facet(tree, {
                cursors: { viewCursor },
                get: function (data) {
                    var key, val, arr = [];
                    for (key in data.viewCursor) {
                        if (data.viewCursor.hasOwnProperty(key)) {
                            val = data.viewCursor[key];
                            arr.push({
                                namespace: key,
                                [PRESSED]: val[PRESSED],
                                text: val['text']
                            })
                        }
                    }
                    return arr;
                }
            })
        }
    });

    tree.set([COMMAND_BAR, HELLO_WORLD, PRESSED], false);
    tree.set([COMMAND_BAR, HELLO_WORLD, 'text'], 'Hello World');

    return viewFacet;
}