var _ = require('lodash');

module.exports = {
    isObject: _.partial(isOptionalValueOrFulfilsConstraint, _.isPlainObject, 'Object', undefined),
    isArray: _.partial(isOptionalValueOrFulfilsConstraint, _.isArray, 'Array', undefined),
    isString: _.partial(isOptionalValueOrFulfilsConstraint, _.isString, 'String', undefined),
    isBoolean: _.partial(isOptionalValueOrFulfilsConstraint, _.isBoolean, 'Boolean', undefined),
    isFunction: _.partial(isOptionalValueOrFulfilsConstraint, _.isFunction, 'Function', undefined),
    isNumber: _.partial(isOptionalValueOrFulfilsConstraint, _.isNumber, 'Number', undefined),
    isNotObject: _.partial(isOptionalValueOrFulfilsConstraint, not(_.isPlainObject), undefined, 'The argument should not be of type Object.')
};

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
