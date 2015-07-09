import helloWorldFacet from './hello-world-facet';
import helloWorldView from './hello-world-view';
import helloWorldInteractions from './hello-world-interactions';

export default function helloWorld(appTree) {
    return helloWorldInteractions(helloWorldView(helloWorldFacet(appTree)), appTree);
}