**NOTE** This project is a working draft of a Baobab app framework. This is still a bit rough around the edges.

**NOTE** This README is also a work in progress. I've only written a little bit, and i'm still organizing my thoughts.

The ultimate goal would be to use the research derived to put together a framework which is heavily reliant on Baobab.

## Running the App

```
$ npm install
$ jspm install
$ harp server
```

## AOP logging

**this is pretty sweet** and it's *color coded*. With debugging enabled, interactions between views (through mediator) will be logged, along with other useful information.

These include:

- **view events** view events are logged to the console.
- **interactions between views** are logged in the console, showing the source and target.
- **warnings** are logged when code attempts to do something that the convention does not allow.
   - *EX*: all events fired on a View instance should have arguments: `(event, source, data)`, where `event` is an object like so:
   
   ```
   {
      source: string
      sourceAction: string // optional
      target: string
      targetEvent: string
      eventData: * // optional
   }
   ```

## Composition

```js
interaction( view( viewFacet( tree ) ) )
```

## Core Principles

### Unidirectional Data Flow

Data flows one direction from appTree to interactions, where it flows back into appTree again.

appTree **=>**viewFacet **=>**view **=>**interactions **=>**appTree

### Reactive

Components in this framework *react* to one another. Instead of directly sending messages to one another, components *emit* that they have been changed. Other components *react* to these emitted events.

### Standard Event Arguments

Events emitted within the framework should follow a standard convention when it comes to arguments. The chosen convention is as follows:

```
var eventName = 'test';

// Emit
view.emit(eventName, {}, source, data);

// Handle
view.on(eventName, function (event, source, data) {
  // do stuff
});
```

This is made easier by the `wrapEvent` and `spawnEvent` helpers found in `lib/events/`

### 1 Cursor Per View

Each view has a namespace. It uses that namespace to reserve a cursor on the appTree. For example, my 'hello-world' view should store all of it's view-modely stuff (like active) on appTree.select('hello-world')

### Facets as 'viewModels'

The idea of a facet (as implemented in Baobab) is that it is a read-only view into a data struct. What would be a more perfect fit for unidirectional flow? Facets are used to derive and prepare data from the appTree and present it to the view.

The benefits to this approach are:

- Impossible to break the unidirectional flow (there is no #set on a facet)
- Ability to listen on multiple cursors, or multiple facets, or both


## TODO
