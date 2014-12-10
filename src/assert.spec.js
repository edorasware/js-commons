describe('assert', function () {
    var _ = require('lodash'), assert = require('./assert');

    describe('isObject method', function () {

        it('should throw an exception when value is not an object', function () {
            _.forEach([undefined, null, 0, 0.5, 'text', true, [], _.noop], function (value) {
                expect(function () {
                    assert.isObject(value);
                }).toThrowError('The argument should be of type Object but it is of type: "' + typeof value + '".');
            });
        });

        it('should not throw an exception when value is an object', function () {
            assert.isObject({});
        });

        it('should not throw an exception when value is undefined and optional is true', function () {
            assert.isObject(undefined, true);
        });

        it('should throw an exception with a custom message', function () {
            expect(function () {
                assert.isObject(undefined, false, 'custom error message');
            }).toThrowError('custom error message');
        });

    });

    describe('isArray method', function () {

        it('should throw an exception when is not an array', function () {
            _.forEach([undefined, null, 0, 0.5, 'text', true, {}, _.noop], function (value) {
                expect(function () {
                    assert.isArray(value);
                }).toThrowError('The argument should be of type Array but it is of type: "' + typeof value + '".');
            });
        });

        it('should not throw an exception when value is an array', function () {
            assert.isArray([]);
        });

        it('should not throw an exception when value is undefined and optional is true', function () {
            assert.isArray(undefined, true);
        });

        it('should throw an exception with a custom message', function () {
            expect(function () {
                assert.isArray(undefined, false, 'custom error message');
            }).toThrowError('custom error message');
        });

    });

    describe('isString method', function () {

        it('should throw an exception when is not a string', function () {
            _.forEach([undefined, null, 0, 0.5, [], true, {}, _.noop], function (value) {
                expect(function () {
                    assert.isString(value);
                }).toThrowError('The argument should be of type String but it is of type: "' + typeof value + '".');
            });
        });

        it('should not throw an exception when value is a string', function () {
            assert.isString('text');
        });

        it('should not throw an exception when value is undefined and optional is true', function () {
            assert.isString(undefined, true);
        });

        it('should throw an exception with a custom message', function () {
            expect(function () {
                assert.isString(undefined, false, 'custom error message');
            }).toThrowError('custom error message');
        });

    });

    describe('isFunction method', function () {

        it('should throw an exception when is not a function', function () {
            _.forEach([undefined, null, 0, 0.5, [], true, {}, 'text'], function (value) {
                expect(function () {
                    assert.isFunction(value);
                }).toThrowError('The argument should be of type Function but it is of type: "' + typeof value + '".');
            });
        });

        it('should not throw an exception when value is a function', function () {
            assert.isFunction(_.noop);
        });

        it('should not throw an exception when value is undefined and optional is true', function () {
            assert.isFunction(undefined, true);
        });

        it('should throw an exception with a custom message', function () {
            expect(function () {
                assert.isFunction(undefined, false, 'custom error message');
            }).toThrowError('custom error message');
        });

    });

    describe('isNotObject method', function () {

        it('should throw an exception when value is not an object', function () {
            _.forEach([
                {}
            ], function (value) {
                expect(function () {
                    assert.isNotObject(value);
                }).toThrowError('The argument should not be of type Object.');
            });
        });

        it('should not throw an exception when value is an object', function () {
            _.forEach([undefined, null, 0, 0.5, 'text', true, [], _.noop], function (value) {
                expect(function () {
                    assert.isNotObject(value);
                }).not.toThrow();
            });
        });

        it('should not throw an exception when value is undefined and optional is true', function () {
            assert.isNotObject(undefined, true);
        });

        it('should throw an exception with a custom message', function () {
            expect(function () {
                assert.isNotObject({}, false, 'custom error message');
            }).toThrowError('custom error message');
        });

    });

    describe('isNumber method', function () {

        it('should throw an exception when value is not a number', function () {
            _.forEach([undefined, null, {}, 'text', true, [], _.noop], function (value) {
                expect(function () {
                    assert.isNumber(value);
                }).toThrowError('The argument should be of type Number but it is of type: "' + typeof value + '".');
            });
        });

        it('should not throw an exception when value is a number', function () {
            _.forEach([0, 0.5], function (value) {
                assert.isNumber(value);
            });
        });

        it('should not throw an exception when value is undefined and optional is true', function () {
            assert.isNumber(undefined, true);
        });

        it('should throw an exception with a custom message', function () {
            expect(function () {
                assert.isNumber(undefined, false, 'custom error message');
            }).toThrowError('custom error message');
        });

    });
});
