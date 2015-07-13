import { View } from 'lib/view/';
import AttributeHook from 'virtual-dom/virtual-hyperscript/hooks/attribute-hook';

import { wrapEvent } from 'lib/events/';
import h from 'virtual-dom/h';
import {
    PRESSED,
    COMMAND_BAR,
    CLICK,
    UI,
    UPDATE
    } from 'app/constants/'

/**
 * @param {Baobab.Facet} viewFacet
 * @returns {View} view
 */
export default function commandBarView(viewFacet) {
    var view = new View(COMMAND_BAR);

    viewFacet.on(UPDATE, function () {
        var { viewCursor, buttons } = viewFacet.get();

        view.render(
            h('div', buttons.map(function (button) {
                return h('button', {
                    'class': new AttributeHook(null, button[PRESSED] ? 'pressed' : ''),
                    'ev-click': wrapEvent(view, [UI, CLICK], button.namespace)
                }, button.text)
            }))
        );
    });

    return view;
}