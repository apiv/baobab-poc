import commandBarFacet from './command-bar-facet';
import commandBarView from './command-bar-view';
import commandBarInteractions from './command-bar-interactions';

export default function commandBar(appTree) {
    return commandBarInteractions( commandBarView( commandBarFacet( appTree ) ), appTree )
}