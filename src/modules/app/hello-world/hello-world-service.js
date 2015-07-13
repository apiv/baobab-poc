import {
    HELLO_WORLD
    } from 'app/constants/';

const PERSISTED_ATTRIBUTES = ['message'];
var originalData;

/**
 * By Convention, all services must return promises
 */

/**
 * Reverts the data back to the last time setOriginalData was called
 * @param {Baobab.Cursor} cursor
 * @return {Promise}
 */
export async function revertService(cursor) {
    applyData(cursor, originalData);
    return cursor;
}

/**
 * Saves the persisted data to localStorage
 * @param {Baobab.Cursor} cursor
 * @return {Promise}
 */
export async function saveService(cursor) {
    try {
        localStorage[HELLO_WORLD] = JSON.stringify(extractData(cursor));
        setOriginalData(extractData(cursor));
    } catch (e) {
        console.log('Whoops.');
    }
    return cursor;
}

/**
 * Updates the cursor with the persisted data from localStorage
 * @param {Baobab.Cursor} cursor
 * @return {Promise}
 */
export async function requestService(cursor) {
    try {
        applyData(cursor, JSON.parse(localStorage[HELLO_WORLD] || '{}'));
        cursor.commit();
        setOriginalData(extractData(cursor));
    } catch (e) {
        console.log('Whoops.');
    }
    return cursor;
}

/**
 * Applies data to the cursor
 * @param cursor
 * @param data
 */
function applyData(cursor, data) {
    cursor.merge(data);
}

/**
 * Extracts data from the cursor to save.
 * @returns {*}
 */
function extractData(cursor) {
    let data = cursor.get();
    let extracted = PERSISTED_ATTRIBUTES.reduce((obj, attr)=> {obj[attr] = data[attr]; return obj}, {});

    return extracted;
}

/**
 * Used in reversion
 * @param data
 */
function setOriginalData(data) {
    originalData = data;
}