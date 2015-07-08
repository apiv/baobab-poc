import {
    COMMAND_BAR,
    HELLO_WORLD,
    UI,
    OPEN,
    CLOSE
    } from 'app/constants/';
import appTree from 'app/app-tree/';

var cursor = appTree.select(HELLO_WORLD);
export default function helloWorldInteractions(view) {
    view.on(view.formatEvent([UI, CLOSE]), close);
    view.on(view.formatEvent([UI, SAVE]), open);

    view.addInteraction(COMMAND_BAR, [HELLO_WORLD, UI, OPEN], [UI, OPEN]);
    view.addInteraction(COMMAND_BAR, [HELLO_WORLD, UI, OPEN], [UI, OPEN]);
}

function close(e, sender, data) {
    cursor.set('active', false);
}

function open(e, sender, data) {
    cursor.set('active', true);
}