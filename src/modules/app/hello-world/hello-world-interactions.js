import {
    COMMAND_BAR,
    HELLO_WORLD,
    UI,
    OPEN,
    RESET,
    CHANGE,
    CLOSE
    } from 'app/constants/';
import appTree from 'app/app-tree/';

var cursor = appTree.select(HELLO_WORLD);
export default function helloWorldInteractions(view) {
    view.on(view.formatEvent([UI, CLOSE]), close);
    view.on(view.formatEvent([UI, OPEN]), open);
    view.on(view.formatEvent([UI, RESET]), reset);
    view.on(view.formatEvent([UI, CHANGE]), change);

    view.addInteraction(COMMAND_BAR, [HELLO_WORLD, UI, OPEN], [UI, OPEN]);
    view.addInteraction(COMMAND_BAR, [HELLO_WORLD, UI, CLOSE], [UI, CLOSE]);

    return view;
}

function close(e, sender, data) {
    cursor.set('active', false);
}

function open(e, sender, data) {
    cursor.set('active', true);
}

function reset(e, sender, data) {
    cursor.set('message', '');
}

function change(e, sender, data) {
    cursor.set('message', e.eventData.currentTarget.value);
}