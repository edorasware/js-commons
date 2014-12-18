describe('urlBuilder', function () {
    var urlBuilder = require('./url-builder'), baseUrl = 'http://user:pass@example.com:8080/directory/file.ext', testUrl = baseUrl + '?x=1#hash';

    describe('build', function () {
        it('should throw an exception when no URL is provided', function () {
            expect(urlBuilder).toThrowContaining('The argument should be of type String but it is of type: "undefined".');
        });

        it('should throw an exception when the provided URL is not a String', function () {
            expect(function () {
                urlBuilder({});
            }).toThrowContaining('The argument should be of type String but it is of type: "object".');
        });

        it('should return an empty URL when an empty or  blank string is provided', function () {
            expect(urlBuilder('').build()).toEqual('');
            expect(urlBuilder('   ').build()).toEqual('');
        });

        it('should return the same URL when a URL is provided', function () {
            expect(urlBuilder(baseUrl).build()).toEqual(baseUrl);
        });
    });

    describe('getParameter', function () {
        it('should return the value of the URL parameter in the URL "query"', function () {
            expect(urlBuilder(baseUrl + '?query1=1').getParameter('query1')).toBe('1');
        });

        it('should return undefined when the parameter does not exist', function () {
            expect(urlBuilder(baseUrl + '?query1=1').getParameter('query2')).toBe(undefined);
        });

        it('should return an array with the parameter values when there are multiple URL parameters with same name', function () {
            var parameters = urlBuilder(baseUrl + '?a=1&q=1&q=2&q=3').getParameters();

            expect(parameters).toEqual({'a': '1', 'q': ['1', '2', '3']});
        });
    });

    describe('getParameters', function () {
        it('should return an object containing all the parameters in the URL "query"', function () {
            expect(urlBuilder(baseUrl + '?a=1&b=2').getParameters()).toEqual({a: '1', b: '2'});
        });

        it('should return empty object if no parameters are defined', function () {
            expect(urlBuilder(baseUrl).getParameters()).toEqual({});
        });
    });

    describe('setParameter', function () {
        it('should set the value of the parameter as simple value', function () {
            var builder = urlBuilder('').setParameter('a', '1');

            expect(builder.build()).toEqual('?a=1');

            builder = urlBuilder(baseUrl).setParameter('a', '1');

            expect(builder.build()).toEqual(baseUrl + '?a=1');

            builder = urlBuilder(baseUrl).setParameter('a', '2');

            expect(builder.build()).toEqual(baseUrl + '?a=2');

            builder = urlBuilder(testUrl).setParameter('a', '1');

            expect(builder.build()).toEqual(baseUrl + '?x=1&a=1#hash');
        });

        it('should set the value of the parameter as array', function () {
            var urlModel = urlBuilder(baseUrl).setParameter('q', ['1', '2', '3']);

            expect(urlModel.build()).toEqual(baseUrl + '?q=1&q=2&q=3');
        });
    });

    describe('setParameters', function () {
        it('should set all the parameters', function () {
            var parameters = {a: '1', b: '2'};

            var builder = urlBuilder('').setParameters(parameters);

            expect(builder.build()).toEqual('?a=1&b=2');

            builder = urlBuilder(baseUrl).setParameters(parameters);

            expect(builder.build()).toEqual(baseUrl + '?a=1&b=2');

            builder = urlBuilder(baseUrl).setParameters({c: '3', d: '4'});

            expect(builder.build()).toEqual(baseUrl + '?c=3&d=4');
        });
    });
});
