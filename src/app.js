import appTree from 'app/app-tree/';
import bootstrap from 'lib/bootstrap/';

/** Components */
import commandBar from 'app/command-bar/';
import helloWorld from 'app/hello-world/';

bootstrap(appTree, 'app', [
    helloWorld,
    commandBar
]);

/** Import debug script for dev mode   */
/** Comment out when building for prod */
import './debug-mode';