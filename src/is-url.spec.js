describe('isUrl', function () {
    var isUrl = require('./is-url'), _ = require('lodash');

    var excludeNonPublicAndRootUrlsShouldMatch = [
            'http://foo.com/blah_blah',
            'http://foo.com/blah_blah/',
            'http://foo.com/blah_blah_(foo)',
            'http://foo.com/blah_blah_(bar)_(foo)',
            'http://www.example.com/wpstyle/?p=364',
            'https://www.example.com/foo/?bar=baz&foo=42&quux',
            'http://✪df.ws/123',
            'http://userid:password@example.com:8080',
            'http://userid:password@example.com:8080/',
            'http://userid@example.com',
            'http://userid@example.com/',
            'http://userid@example.com:8080',
            'http://userid@example.com:8080/',
            'http://userid:password@example.com',
            'http://userid:password@example.com/',
            'http://142.42.1.1/',
            'http://142.42.1.1:8080/',
            'http://➡.ws/䨹',
            'http://⌘.ws',
            'http://⌘.ws/',
            'http://foo.com/blah_(wikipedia)#cite-1',
            'http://foo.com/blah_(wikipedia)_blah#cite-1',
            'http://foo.com/unicode_(✪)_in_parens',
            'http://foo.com/(something)?after=parens',
            'http://☺.foo.com/',
            'http://code.google.com/events/#&product=browser',
            'http://j.mp',
            'ftp://foo.bar/baz',
            'http://foo.bar/?q=Test%20URL-encoded%20stuff',
            'http://مثال.إختبار',
            'http://例子.测试',
            'http://उदाहरण.परीक्षा',
            'http://1337.net',
            'http://a.b-c.de',
            'http://192.128.0.1',
            'http://223.255.255.254',
            'http://www.foo.bar./'
        ],
        excludeNonPublicAndRootUrlsShouldNotMatch = [
            'http://',
            'http://.',
            'http://..',
            'http://../',
            'http://?',
            'http://??',
            'http://??/',
            'http://#',
            'http://##',
            'http://##/',
            'http://foo.bar?q=Spaces should be encoded',
            '//',
            '//a',
            '///a',
            '///',
            'http:///a',
            'foo.com',
            'rdar://1234',
            'h://test',
            'http:// shouldfail.com',
            ':// should fail',
            'http://foo.bar/foo(bar)baz foo',
            'ftps://foo.bar/',
            'http://-error-.invalid/',
            'http://-a.b.co',
            'http://a.b-.co',
            'http://0.0.0.0',
            'http://10.1.1.0 ',
            'http://10.1.1.255',
            'http://224.1.1.1',
            'http://1.1.1.1.1',
            'http://123.123.123',
            'http://3628126748',
            'http://.www.foo.bar/',
            'http://.www.foo.bar./',
            'foo',
            'foo-bar',
            'http://localhost'
        ],
        nonPublicAndRootUrlsShouldMatch = [
            '/rest/foo/bar',
            '/rest/foo/bar/',
            './rest/foo/bar/',
            '../rest/foo/bar/',
            'http://localhost',
            'http://localhost/',
            'http://localhost/rest/foo/bar',
            'http://localhost/rest/foo/bar/',
            'http://localhost:3000',
            'http://localhost:3000/',
            'http://localhost:3000/rest/foo/bar',
            'http://localhost:3000/rest/foo/bar/'
        ],
        nonPublicAndRootUrlsShouldNotMatch = [
            'localhost',
            'http://:3000/rest/foo/bar',
            'http://:3000',
            ':3000'
        ];

    describe('exclude non-public addresses and root valid urls', function () {
        generateTests(excludeNonPublicAndRootUrlsShouldMatch, false, true);
    });

    describe('exclude non-public addresses and root invalid urls', function () {
        generateTests(excludeNonPublicAndRootUrlsShouldNotMatch, false, false);
    });

    describe('include non-public addresses and root valid urls', function () {
        generateTests(nonPublicAndRootUrlsShouldMatch, true, true);
    });

    describe('include non-public addresses and root invalid urls', function () {
        generateTests(nonPublicAndRootUrlsShouldNotMatch, true, false);
    });

    function generateTests(fixtures, includeLocalAddresesAndRootUrls, expectedResult) {
        _.forEach(fixtures, function (fixture) {
            it(fixture, function () {
                expect(isUrl(fixture, includeLocalAddresesAndRootUrls)).toBe(expectedResult);
            });
        });
    }
});
