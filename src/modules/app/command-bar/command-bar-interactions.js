import {
    COMMAND_BAR,
    HELLO_WORLD,
    UI,
    OPEN,
    RESET,
    CHANGE,
    CLOSE,
    CLICK,
    PRESSED,
    } from 'app/constants/';
import appTree from 'app/app-tree/';
import { spawnEvent } from 'lib/events/';

var cursor = appTree.select(COMMAND_BAR);
export default function commandBarInteractions(view) {
    view.on(view.formatEvent([UI, CLICK]), click);

    view.on(view.formatEvent([UI, CLOSE]), close);
    view.on(view.formatEvent([UI, OPEN]), open);

    view.addInteraction(HELLO_WORLD, [UI, CLOSE], [UI, CLOSE]);

    function click(e, sender, data) {
        var isPressed = cursor.get([data, PRESSED]);
        var event = isPressed ? CLOSE : OPEN;

        spawnEvent(view, [UI, event], data, e);
        spawnEvent(view, [data, UI, event], data, e);
    }

    function close(e, sender, data) {
        cursor.set([data, PRESSED], false)
    }

    function open(e, sender, data) {
        cursor.set([data, PRESSED], true)
    }

    return view;
}