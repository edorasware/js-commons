var _ = require('lodash');

exports.isObject = _.partial(isOptionalValueOrFulfilsConstraint, _.isPlainObject, 'Object', undefined);

exports.isArray = _.partial(isOptionalValueOrFulfilsConstraint, _.isArray, 'Array', undefined);

exports.isString = _.partial(isOptionalValueOrFulfilsConstraint, _.isString, 'String', undefined);

exports.isFunction = _.partial(isOptionalValueOrFulfilsConstraint, _.isFunction, 'Function', undefined);

exports.isNumber = _.partial(isOptionalValueOrFulfilsConstraint, _.isNumber, 'Number', undefined);

exports.isNotObject = _.partial(isOptionalValueOrFulfilsConstraint, not(_.isPlainObject), undefined, 'The argument should not be of type Object.');

function not(fn) {
    return function () {
        return !fn.apply(fn, arguments);
    }
}

function isOptionalValueOrFulfilsConstraint(constraint, typeName, defaultErrorMessage, value, optional, errorMessage) {
    if ((optional !== true || !_.isUndefined(value)) && !constraint(value)) {
        errorMessage = errorMessage || defaultErrorMessage || 'The argument should be of type ' + typeName + ' but it is of type: "' + typeof value + '".';
        throw new Error(errorMessage);
    }
}
