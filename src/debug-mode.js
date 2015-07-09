/**
 * Import this file into app.js to enable debugging
 */

import 'lib/debug/convention/baobab-events';
import 'lib/debug/convention/events';

/** Debug -- expose appTree */
import appTree from 'app/app-tree/';
window.appTree = appTree;

/** Debug -- expose Baobab */
import Baobab from 'baobab';
window.Baobab = Baobab;