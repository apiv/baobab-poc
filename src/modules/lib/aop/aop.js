import perfget from 'perfget';
import util from 'util';
import events from 'events';
import { isPrimitive } from 'lib/is-primitive/';

var DOT = '.';

export function AOP() {
    if (!(this instanceof AOP)) {
        return new AOP();
    }
    this.beforeAdvices = [];
    this.filters = [];
    events.EventEmitter.call(this);
}

util.inherits(AOP, events.EventEmitter);

AOP.prototype.before = function (advice) {
    this.beforeAdvices.push(advice);
    return this;
};

AOP.prototype.pluck = function (key, callback) {
    this.beforeAdvices.push(function (data) {
        callback(perfget._get(data)(key));
    });
    return this;
};

AOP.prototype.filter = function (key, value) {
    this.filters.push(function (data) {
        return perfget._get(data)(key) === value;
    });
    return this;
};

AOP.prototype.exclude = function (key) {
    this.filters.push(function (data, value) {
        return perfget._get(data)(key) !== value;
    });
    return this;
};

function send(data) {
    return function (fn) {
        return fn(data);
    };
}

function createWrapper(aop, pointCut) {
    return function wrapped() {
        var sendData = send({receiver:this, arguments: arguments});
        if (aop.filters.every(sendData)) {
            aop.beforeAdvices.forEach(sendData);
        }
        return pointCut.apply(this, arguments);
    };
}

function updateTarget(obj, prop, pointCut) {
    var aop = perfget._get(obj)([prop, 'aop']);
    if (!aop) {
        aop = new AOP();
        obj[prop] = createWrapper(aop, pointCut);
        obj[prop].aop = aop;
    }
    return aop;
}

export function wrap(namespace, path) {
    var prop, branchSegments, branch;
    var target = (isPrimitive(namespace) ? perfget._get(null)() : namespace);
    var segments = path ? path.split ? path.split(DOT) : path : [];
    var pointCut = perfget._get(target)(segments);
    if (typeof pointCut !== 'function') {
        return console.error('AOP: ', path, ' is not a function');
    }
    if (segments.length === 1) {
        return updateTarget(target, path, pointCut);
    }
    prop = segments[segments.length - 1];
    branchSegments = segments.slice(0);
    branchSegments.length -= 1;
    branch = perfget._get(target)(branchSegments);
    return updateTarget(branch, prop, pointCut);
}

export function log(message, background, color) {
    return function () {
        var args = Array.prototype.slice.call(arguments, 0);
        var bg = background ? 'background: ' + background + ';' : '';
        var clr = color ? 'color: ' + color + ';' : '';
        var msg = isPrimitive(message) ? message : JSON.stringify(message);
        if (background || color) {
            args = ['%c ' + msg + ' ', bg + clr].concat(args);
        } else {
            if (msg) {
                args.unshift(msg);
            }
        }
        if (console && console.log && console.log.apply) {
            console.log.apply(console, args);
        }
    };
}
