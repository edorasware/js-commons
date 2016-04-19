module.exports = function (url) {
    require('polyfills'); // remove this line when IE8 support is dropped.
    var _ = require('lodash'), assert = require('./assert');

    var urlModel = createUrlModel(url),
        builder = {
            build: build,
            getParameter: getParameter,
            setParameter: setParameter,
            getParameters: getParameters,
            setParameters: setParameters
        };

    return builder;

    function createUrlModel(url) {
        assert.isString(url);

        return parseUrl(url);
    }

    function build(encodeParameterValues) {
        var parameters = [],
            parameterValueEncoder = encodeParameterValues === false ? _.identity : encodeURIComponent;

        _.forOwn(urlModel.parameters, function (parameterValue, parameterName) {
            parameters.push(buildParameter(parameterName, parameterValue, parameterValueEncoder));
        });

        urlModel.search = parameters.length > 0 ? '?' + parameters.join('&') : '';

        return urlModel.origin + urlModel.pathname + urlModel.search + urlModel.hash;

        function buildParameter(parameterName, parameterValue, parameterValueEncoder) {
            if (_.isArray(parameterValue)) {
                parameterValue = parameterValue.map(parameterValueEncoder).join('&' + parameterName + '=');
            } else if (_.isPlainObject(parameterValue)) {
                parameterValue = parameterValueEncoder(JSON.stringify(parameterValue));
            } else {
                parameterValue = parameterValueEncoder(parameterValue);
            }

            return parameterName + '=' + parameterValue;
        }
    }

    function getParameter(name) {
        var parameters = getParameters();

        return parameters[name] || undefined;
    }

    function setParameter(name, value) {
        urlModel.parameters[name] = value;

        return builder;
    }

    function getParameters() {
        return urlModel.parameters || {};
    }

    function setParameters(parameters) {
        urlModel.parameters = parameters;

        return builder;
    }

    function parseUrl(url) {
        var parsedUri = {},
            uriParserRegex = /^(?:(?:(([^:\/#\?]+:)?(?:(?:\/\/)(?:(?:(?:([^:@\/#\?]+)(?:\:([^:@\/#\?]*))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((?:\/?(?:[^\/\?#]+\/+)*)(?:[^\?#]*)))?(\?[^#]+)?)(#.*)?/,
            uriKeys = [
                "href",
                "origin",
                "protocol",
                "username",
                "password",
                "host",
                "hostname",
                "port",
                "pathname",
                "search",
                "hash"
            ],
            uriKeyValues = uriParserRegex.exec(url.trim());

        _.forEach(uriKeys, function (uriKey, index) {
            parsedUri[uriKey] = uriKeyValues[index] || '';
        });

        parsedUri.parameters = parseQuery(parsedUri.search);

        return parsedUri;

        function parseQuery(queryString) {
            var parameters = {}, queryParserRegex = /(?:^|&)([^&=]*)=?([^&]*)/g;

            _.forOwn(queryString.match(queryParserRegex), function (separatorAndParameter) {
                var parameterNameAndValue = separatorAndParameter.toString().substr(1);

                if (parameterNameAndValue.indexOf('=') >= 0) {
                    parameterNameAndValue = parameterNameAndValue.split('=');
                    addParameter(parameters, parameterNameAndValue[0], parameterNameAndValue[1]);
                }
            });

            return parameters;

            function addParameter(parameters, parameterName, parameterValue) {
                var currentParameterValue = parameters[parameterName];

                if (currentParameterValue) {
                    if (_.isArray(currentParameterValue)) {
                        currentParameterValue.push(parameterValue);
                    } else {
                        parameters[parameterName] = [currentParameterValue, parameterValue];
                    }
                } else {
                    parameters[parameterName] = parameterValue;
                }
            }
        }
    }
};
