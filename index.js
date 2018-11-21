const wrapper = (fn) => {
  return (...params) => new Promise((resolve, reject) => {
    if (!params.length) {
      // no params for the target function, assume the target only ask for a callback
      fn(
        (err, data) => {
          err
            ? reject(err)
            : resolve(data);
        }
      )
      return;
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
