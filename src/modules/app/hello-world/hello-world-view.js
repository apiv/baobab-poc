import View from 'lib/view/';

import {
    HELLO_WORLD,
    UI,
    CLOSE,
    ACTIVE
    } from 'app/constants'

/**
 * @param {Baobab.Facet} viewFacet
 * @returns {View} view
 */
export default function helloWorldView(viewFacet) {
    var view = new View(HELLO_WORLD);

    viewFacet.on('update', function () {
        let { viewCursor } = viewFacet.get();

        view.render(
            h('div', {
                'class': viewCursor[ACTIVE] ? '' : 'hidden'
            }, [
                h('span', [viewCursor.message]),
                h('button', {
                    'ev-click': view.emit(view.formatEvent([UI, CLOSE]))
                }, ['Close'])
            ])
        );
    });

    return view;
}