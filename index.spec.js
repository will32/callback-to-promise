const wrapper = require('./index');

describe('Callback to promise', () => {
  it('should be able to transfer callback caller to a promise', () => {
    const fn = (data, callback) => { };
    const promise = wrapper(fn);
    expect(promise('test').then).toBeDefined();
  });
  it('should be able to reject when errors', async () => {
    const error = new Error('test');
    const fn = (param, callback) => callback(error);
    const catcher = jest.fn();
    const promise = wrapper(fn);
    await promise(undefined).catch(catcher);
    expect(catcher).toHaveBeenCalledWith(error);
  });
  it('should be able to resolve data', async () => {
    const callbackData = { something: 'test' };
    const fn = (param, callback) => {
      callback(undefined, callbackData);
    };
    const resolver = jest.fn();
    const promise = wrapper(fn);
    await promise(undefined).then(resolver);
    expect(resolver).toHaveBeenCalledWith(callbackData);
  });
  it('should be able to pass the params to the caller', async () => {
    const checker = jest.fn();
    const fn = (param, callback) => {
      checker(param);
      callback();
    };
    const promise = wrapper(fn);
    const param = { something: 'test' };
    await promise(param);
    expect(checker).toHaveBeenCalledWith(param);
  });
  it('should be able to resolve without extra params', async () => {
    const callbackData = { something: 'test' };
    const fn = (callback) => {
      callback(undefined, callbackData);
    };
    const resolver = jest.fn();
    const promise = wrapper(fn);
    await promise().then(resolver);
    expect(resolver).toHaveBeenCalledWith(callbackData);
  });
  it('should be able to reject without extra params when error', async () => {
    const error = new Error('test');
    const fn = (callback) => callback(error);
    const catcher = jest.fn();
    const promise = wrapper(fn);
    await promise().catch(catcher);
    expect(catcher).toHaveBeenCalledWith(error);
  });
});