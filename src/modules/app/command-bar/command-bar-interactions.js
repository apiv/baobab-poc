import {
    COMMAND_BAR,
    HELLO_WORLD,
    UI,
    OPEN,
    REVERT,
    CHANGE,
    CLOSE,
    CLICK,
    PRESSED,
    } from 'app/constants/';
import { spawnEvent } from 'lib/events/';

export default function commandBarInteractions(view, appTree) {
    var cursor = appTree.select(COMMAND_BAR);

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