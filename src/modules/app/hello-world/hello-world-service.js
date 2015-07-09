import {
    HELLO_WORLD
    } from 'app/constants/';

var viewCursor = appModel.select(HELLO_WORLD);
export default function helloWorldService() {
    viewCursor.on('save', ()=> save(viewCursor.get()));
    viewCursor.on('reset', ()=> viewCursor.merge(get()));
}

var lastResponse = null;
export function save(data) {
    localStorage[HELLO_WORLD] = JSON.stringify(save);
    return data;
}

export function get() {
    return JSON.parse(localStorage[HELLO_WORLD] || {})
}