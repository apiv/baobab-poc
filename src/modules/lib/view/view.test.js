/* global describe,it,beforeEach,afterEach,expect */

import { View } from 'lib/view/';
import events from 'events';
import h from 'virtual-dom/h';
import { CREATED } from 'lib/constants/';

//http://chaijs.com/api/bdd/
//http://sinonjs.org/docs/
var fName = 'View';
describe(fName, function () {

    it('exists', function () {
        expect(View).to.exist();
    });

    it('is a function', function () {
        expect(View).to.be.a('function');
    });

    describe('a view instance', function () {
        var view = new View('test');
        it('has the correct interface', function () {
            expect(view.render).to.be.a('function');
            expect(view.addFullInteraction).to.be.a('function');
            expect(view.addInteraction).to.be.a('function');
            expect(view.addPushInteraction).to.be.a('function');
            expect(view.parseEvent).to.be.a('function');
            expect(view.parseAction).to.be.a('function');
            expect(view.formatAction).to.be.a('function');
            expect(view.formatEvent).to.be.a('function');
            expect(view.formatInteraction).to.be.a('function');
            expect(view.focus).to.be.a('function');
            expect(view).to.be.an.instanceof(events.EventEmitter);
        });
        it('can take a namespace', function () {
            expect(view.namespace).to.equal('test');
        });
    });

    describe('#render', function () {
        it('saves the tree and emits created', function () {
            var view = new View();
            var tree = h('div');
            var spy = sinon.spy();
            view.on(CREATED, spy);
            expect(view.render(tree)).to.equal(view);
            expect(view.tree).to.equal(tree);
            expect(view.root).to.exist();
            expect(spy.called).to.be.true;
            expect(spy.getCall(0).args[0]).to.equal(view.root);
            expect(view.root.tagName).to.equal('DIV');
        });
    });

    describe('#addFullInteraction', function () {
        it('has a fluid interface', function () {
            var view = new View('myView');
            expect(view.addFullInteraction('a', 'b', 'c', 'd')).to.equal(view);
        });
        it('can format four parameters', function () {
            var view = new View();
            expect(view.interactions.length).to.equal(0);
            view.addFullInteraction('src', ['srcElm', 'srcEvt'], 'tar', ['tarElm', 'tarEvt']);
            expect(view.interactions.length).to.equal(1);
            expect(view.interactions[0]).to.equal('src#srcElm:srcEvt->tar#tarElm:tarEvt');
            view.addFullInteraction('src', ['srcElm', 'srcEvt'], 'tar', 'tarEvt');
            expect(view.interactions.length).to.equal(2);
            expect(view.interactions[1]).to.equal('src#srcElm:srcEvt->tar#tarEvt');
            view.addFullInteraction('src', 'srcEvt', 'tar', 'tarEvt');
            expect(view.interactions.length).to.equal(3);
            expect(view.interactions[2]).to.equal('src#srcEvt->tar#tarEvt');
        });
        it('assumes the target event is the same as the source event if omitted', function (){
            var view = new View();
            expect(view.interactions.length).to.equal(0);
            view.addFullInteraction('src', ['srcElm', 'srcEvt'], 'tar');
            expect(view.interactions.length).to.equal(1);
            expect(view.interactions[0]).to.equal('src#srcElm:srcEvt->tar#srcElm:srcEvt');
            view.addFullInteraction('src', 'srcEvt', 'tar');
            expect(view.interactions.length).to.equal(2);
            expect(view.interactions[1]).to.equal('src#srcEvt->tar#srcEvt');
        });
    });

    describe('#addInteraction', function () {
        it('has a fluid interface', function () {
            var view = new View('myView');
            expect(view.addInteraction('a', 'b', 'c')).to.equal(view);
        });
        it('can format three parameters injecting the view.namespace', function () {
            var view = new View('myView');
            expect(view.interactions.length).to.equal(0);
            view.addInteraction('src', ['srcElm', 'srcEvt'], ['tarElm', 'tarEvt']);
            expect(view.interactions.length).to.equal(1);
            expect(view.interactions[0]).to.equal('src#srcElm:srcEvt->myView#tarElm:tarEvt');
            view.addInteraction('src', ['srcElm', 'srcEvt'], 'tarEvt');
            expect(view.interactions.length).to.equal(2);
            expect(view.interactions[1]).to.equal('src#srcElm:srcEvt->myView#tarEvt');
            view.addInteraction('src', 'srcEvt', 'tarEvt');
            expect(view.interactions.length).to.equal(3);
            expect(view.interactions[2]).to.equal('src#srcEvt->myView#tarEvt');
        });
    });

    describe('#addPushInteraction', function () {
        it('has a fluid interface', function () {
            var view = new View('myView');
            expect(view.addPushInteraction('a', 'b', 'c')).to.equal(view);
        });
        it('can format three parameters injecting view.namespace', function () {
            var view = new View('myView');
            expect(view.interactions.length).to.equal(0);
            view.addPushInteraction(['srcElm', 'srcEvt'], 'tar', ['tarElm', 'tarEvt']);
            expect(view.interactions.length).to.equal(1);
            expect(view.interactions[0]).to.equal('myView#srcElm:srcEvt->tar#tarElm:tarEvt');
            view.addPushInteraction(['srcElm', 'srcEvt'], 'tar', 'tarEvt');
            expect(view.interactions.length).to.equal(2);
            expect(view.interactions[1]).to.equal('myView#srcElm:srcEvt->tar#tarEvt');
            view.addPushInteraction('srcEvt', 'tar', 'tarEvt');
            expect(view.interactions.length).to.equal(3);
            expect(view.interactions[2]).to.equal('myView#srcEvt->tar#tarEvt');
        });
    });
    
    describe('#parseEvent', function () {
        it('can parse an event', function () {
            var view = new View();
            expect(view.parseEvent('a')).to.deep.equal(['a']);
            expect(view.parseEvent('a:b')).to.deep.equal(['a', 'b']);
            expect(view.parseEvent(['a'])).to.deep.equal(['a']);
            expect(view.parseEvent(['a', 'b'])).to.deep.equal(['a', 'b']);
        });
    });

    describe('#parseAction', function () {
        it('can parse an action', function () {
            var view = new View();
            expect(view.parseAction('a#b')).to.deep.equal(['a', 'b']);
            expect(view.parseAction('a#b:c')).to.deep.equal(['a', 'b:c']);
            expect(view.parseAction(['a', 'b'])).to.deep.equal(['a', 'b']);
            expect(view.parseAction(['a', 'b:c'])).to.deep.equal(['a', 'b:c']);
            expect(view.parseAction(['a', ['b', 'c']])).to.deep.equal(['a', ['b', 'c']]);
        });
    });

    describe('#formatEvent', function () {
        it('can format an event', function () {
            var view = new View();
            expect(view.formatEvent('a')).to.equal('a');
            expect(view.formatEvent('a:b')).to.equal('a:b');
            expect(view.formatEvent(['a'])).to.equal('a');
            expect(view.formatEvent(['a', 'b'])).to.equal('a:b');
        });
    });

    describe('#formatAction', function () {
        it('can format an action', function () {
            var view = new View();
            expect(view.formatAction(['a', 'b'])).to.equal('a#b');
            expect(view.formatAction(['a', 'b:c'])).to.equal('a#b:c');
            expect(view.formatAction(['a', ['b', 'c']])).to.equal('a#b:c');
        });
    });

    describe('#formatInteraction', function () {
        it('can format an interaction', function () {
            var view = new View();
            expect(view.formatInteraction('a#b', 'c#d')).to.equal('a#b->c#d');
            expect(view.formatInteraction('a#b:c', 'd#e')).to.equal('a#b:c->d#e');
            expect(view.formatInteraction('a#b:c', 'd#e:f')).to.equal('a#b:c->d#e:f');
            expect(view.formatInteraction('a#b', 'c#d:e')).to.equal('a#b->c#d:e');
            expect(view.formatInteraction(['a', 'b'], 'c#d')).to.equal('a#b->c#d');
            expect(view.formatInteraction(['a', 'b:c'], 'd#e')).to.equal('a#b:c->d#e');
            expect(view.formatInteraction(['a', ['b', 'c']], 'd#e:f')).to.equal('a#b:c->d#e:f');
            expect(view.formatInteraction(['a', 'b'], 'c#d:e')).to.equal('a#b->c#d:e');
            expect(view.formatInteraction('a#b', ['c', 'd'])).to.equal('a#b->c#d');
            expect(view.formatInteraction(['a','b:c'], ['d', 'e'])).to.equal('a#b:c->d#e');
            expect(view.formatInteraction('a#b:c', ['d', ['e','f']])).to.equal('a#b:c->d#e:f');
            expect(view.formatInteraction(['a', 'b'], ['c', ['d','e']])).to.equal('a#b->c#d:e');
        });
    });

    //NOTE view.focus not under test at this time
});
