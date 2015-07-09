import {
    COMMAND_BAR,
    HELLO_WORLD,
    UI,
    OPEN,
    RESET,
    CHANGE,
    CLOSE,
    SAVE
    } from 'app/constants/';

export default function helloWorldInteractions(view, appTree) {
    var cursor = appTree.select(HELLO_WORLD);

    view.on(view.formatEvent([UI, CLOSE]), close);
    view.on(view.formatEvent([UI, OPEN]), open);
    view.on(view.formatEvent([UI, RESET]), reset);
    view.on(view.formatEvent([UI, CHANGE]), change);
    view.on(view.formatEvent([UI, SAVE]), save);

    view.addInteraction(COMMAND_BAR, [HELLO_WORLD, UI, OPEN], [UI, OPEN]);
    view.addInteraction(COMMAND_BAR, [HELLO_WORLD, UI, CLOSE], [UI, CLOSE]);

    function close(e, sender, data) {
        cursor.set('active', false);
    }

    function open(e, sender, data) {
        cursor.set('active', true);
    }

    function reset(e, sender, data) {
        //cursor.emit('reset')
    }

    function change(e, sender, data) {
        cursor.set('message', e.eventData.currentTarget.value);
    }

    function save(e, sender, data) {
        //cursor.emit('save')
    }

    return view;
}