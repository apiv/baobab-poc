import { View } from 'lib/view/';
import AttributeHook from 'virtual-dom/virtual-hyperscript/hooks/attribute-hook';

import { wrapEvent } from 'lib/events/';
import h from 'virtual-dom/h';
import {
    HELLO_WORLD,
    UI,
    CLOSE,
    REVERT,
    CHANGE,
    ACTIVE,
    SAVE,
    UPDATE
    } from 'app/constants/'

/**
 * @param {Baobab.Facet} viewFacet
 * @returns {View} view
 */
export default function helloWorldView(viewFacet) {
    var view = new View(HELLO_WORLD);

    viewFacet.on(UPDATE, function () {
        var { viewCursor } = viewFacet.get();

        view.render(
            h('div', {
                'class': new AttributeHook(null, viewCursor[ACTIVE] ? '' : 'hidden')
            }, [
                h('input', {
                    id: 'message',
                    type: 'text',
                    value: viewCursor.message,
                    'ev-keyup': wrapEvent(view, [UI, CHANGE], HELLO_WORLD)
                }),
                h('button', {
                    'ev-click': wrapEvent(view, [UI, SAVE], HELLO_WORLD)
                }, ['Save']),
                h('br'),
                h('span', [viewCursor.message]),
                h('br'),
                h('button', {
                    'ev-click': wrapEvent(view, [UI, REVERT], HELLO_WORLD)
                }, ['Reset']),
                h('button', {
                    'ev-click': wrapEvent(view, [UI, CLOSE], HELLO_WORLD)
                }, ['Close'])
            ])
        );
    });

    return view;
}