const wrapper = (fn) => {
  return (...params) => new Promise((resolve, reject) => {
    if (!params.length) {
      throw new TypeError("The execution function needs to have paramter besides callback, even undefined");
    }
    fn(
      ...params,
      (err, data) => {
        err
        ? reject(err)
        : resolve(data);
      }
    )
  })
}

module.exports = wrapper;
