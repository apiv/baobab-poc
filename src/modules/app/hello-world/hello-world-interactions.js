import {
    COMMAND_BAR,
    HELLO_WORLD,
    UI,
    OPEN,
    REVERT,
    CHANGE,
    CLOSE,
    SAVE,
    SERVICE
    } from 'app/constants/';

export default function helloWorldInteractions(view, appTree) {
    var viewCursor = appTree.select(HELLO_WORLD);

    view.on(view.formatEvent([UI, CLOSE]), close);
    view.on(view.formatEvent([UI, OPEN]), open);
    view.on(view.formatEvent([UI, REVERT]), reset);
    view.on(view.formatEvent([UI, CHANGE]), change);
    view.on(view.formatEvent([UI, SAVE]), save);

    view.addInteraction(COMMAND_BAR, [HELLO_WORLD, UI, OPEN], [UI, OPEN]);
    view.addInteraction(COMMAND_BAR, [HELLO_WORLD, UI, CLOSE], [UI, CLOSE]);

    function close(e, sender, data) {
        viewCursor.set('active', false);
    }

    function open(e, sender, data) {
        viewCursor.set('active', true);
    }

    function reset(e, sender, data) {
        viewCursor.emit(REVERT);
    }

    function change(e, sender, data) {
        viewCursor.set('message', e.eventData.currentTarget.value);
    }

    function save(e, sender, data) {
        viewCursor.emit(SAVE);
    }

    return view;
}