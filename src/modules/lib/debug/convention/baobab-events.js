import Baobab from 'baobab';
import warn from 'lib/warn/';
import { wrap } from 'lib/aop/';

var standardEvents = [
    'update',
    'invalid',
    'get',
    'select',
    'irrelevant',
    'relevant',
    'save',
    'reset'
];

wrap(Baobab.Cursor, 'prototype.emit')
    .before(function (data) {
        let event = data.arguments[0];
        if (!~standardEvents.indexOf(event)) {
            warn('NonStandardEvent', `"${event}" is not a standard event of Baobab.Cursor`, data)
        }
    });

wrap(Baobab.Facet, 'prototype.emit')
    .before(function (data) {
        let event = data.arguments[0];
        if (!~standardEvents.indexOf(event)) {
            warn('NonStandardEvent', `"${event}" is not a standard event of Baobab.Cursor`, data)
        }
    });