**NOTE** This project is a working draft of a Boabab app framework

## Composition

```js
view( viewFacet( tree ) )
```

### view

### viewFacet

Facets are read-only 'views' of a Baobab tree (think MySQL table view). For this reason, I found them to be the ideal
construct for preparing data for a view.

Each module will have it's own cursor on appTree for storing view specific data (e.g., ACTIVE).

The viewFacet reacts to events on itself, fired by the view (todo: separate intent layer?)

```js
export function moduleViewFacet() {
  var viewFacet = new Baobab.Facet(tree, {
    cursors: {
      viewFacet: MODULE_NAMESPACE
    },
    facets: {}
  });

  viewFacet.on(UI_CLOSE, ()=> tree.set([MODULE_NAMESPACE, ACTIVE], false));
  viewFacet.on(UI_OPEN, ()=> tree.set([MODULE_NAMESPACE, ACTIVE], true));

  return viewFacet;
}
```

### intent

**todo** unsure about this

```js
import appTree from 'app/tree';

export function moduleIntent(view) {
  let interactions = {
    close$: Rx.Observable.merge(
      Rx.Observable.fromEvent(view, UI_CLOSE),
      RX.Observable.fromEvent(mediator, [SS, UI_CLOSE])
    ),
    open$: Rx.Observable.fromEvent(view, UI_OPEN),
    change$: Rx.Observable.fromEvent(view, UI_CHANGE)
  }

  interactions.close$.forEach((e)=> appTree.set([MODULE_NAMESPACE, ACTIVE], false));
  interactions.open$.forEach((e)=> appTree.set([MODULE_NAMESPACE, ACTIVE], true));

  interactions.change$.forEach((e)=> appTree.merge(MODULE_NAMESPACE, e.changes));
  interactions.save$.forEach((e)=> null);
}
```