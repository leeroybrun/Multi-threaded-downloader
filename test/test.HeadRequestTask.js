var mockery = require('./mock/mock.requires');
var should = require('should');
var e = require('../lib/Exceptions');

var HeadRequestTask;
describe('HeadRequestTask', function() {
	before(function() {
		mockery.enable({
			warnOnUnregistered: false
		});

		HeadRequestTask = require('../lib/core/HeadRequestAsyncTask');
	});

	after(function() {
		mockery.disable();
	});

	it('test execute method', function(done) {

		var req = new HeadRequestTask('http://random/dom');

		var callback = function(err, data) {
			if (data) {
				data.fileSize.should.equal(100);
				data.headers.should.equal(mockery.Fake_HttpBodyResponse.headers);
				done();
			}

		};
		req.execute(callback);

	});

	it('test onerror method', function(done) {

		var req = new HeadRequestTask('http://random/dom');

		var callback = function(err, data) {
			if (err) {
				err.should.eql(e(1004, 'random'));
				done();
			}

		};
		req.execute(callback);

	});
});