export function wrapEvent(view, event, data) {
    var eventName = view.formatEvent(event);

    return function (input) {
        view.emit(eventName, {
            source: view.namespace,
            target: view.namespace,
            targetEvent: eventName,
            eventData: input
        }, view.namespace, data)
    }
}

export function spawnEvent(view, event, data, originalEvent) {
    return wrapEvent(view, event, data)(originalEvent);
}