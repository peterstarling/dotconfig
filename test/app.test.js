import chai from 'chai';
import proxyquire from 'proxyquire';

const expect = chai.expect;

describe('config', function() {

	let config;

	before(function() {
		config = proxyquire.noCallThru().load('../src/app', { '../../../../config/queue': { 
			test_var_1: 'test value 1',
			test_var_2: {
				nested_val_1: 'some nested value',
				nested_val_2: 'another nested value'
			}
		} }).default;
	});

	it('should return value from a file', function() {
		expect(config('queue.test_var_1')).to.be.equal('test value 1');
		expect(config('queue.test_var_1')).to.be.equal('test value 1');
	});

	it('should return a nested value from a file', function() {
		expect(config('queue.test_var_2.nested_val_2')).to.be.equal('another nested value');
	});

	it('should return null if variable does not exist', function() {
		expect(config('queue.something.anything')).to.be.null;
	})

	it('should return null if the entire config file does not exist', function() {
		expect(config('asdasda.asdasd')).to.be.null;
	});

	it('should return fallback value for an undefined config entry', function() {
		expect(config('asdasdas.asdas', 'fallback value')).to.be.equal('fallback value');
	});
});
