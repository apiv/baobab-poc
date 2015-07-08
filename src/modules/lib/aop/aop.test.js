/* global describe,it,beforeEach,afterEach,expect */

import { wrap, AOP } from 'lib/aop/';
import events from 'events';
import perfget from 'perfget';
import { UPDATED } from 'lib/constants/';

var EventEmitter = events.EventEmitter;
//http://chaijs.com/api/bdd/
//http://sinonjs.org/docs/
var fName = 'wrap';
describe(fName, function () {

    it('exists', function () {
        expect(wrap).to.exist();
    });

    it('is a function', function () {
        expect(wrap).to.be.a('function');
    });

    describe('wrap returns an instance of AOP with the correct interface', function () {
        var obj = {
            method: function (x) {return x;}
        };
        var aop = wrap(obj, 'method');

        it('is an instance of AOP', function () {
            expect(aop).to.be.an.instanceof(AOP);
        });

        it('is an instance of EventEmitter', function () {
            expect(aop).to.be.an.instanceof(EventEmitter);
        });

        it('has the correct interface', function () {
            expect(aop.before).to.be.a('function');
            expect(aop.filter).to.be.a('function');
            expect(aop.pluck).to.be.a('function');
            expect(aop.emit).to.be.a('function');
        });

        //TODO add more tests for the implementation
    });
});