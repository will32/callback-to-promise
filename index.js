const wrapper = (fn, options) => {
  return (...params) => new Promise((resolve, reject) => {
    fn(
      ...[
        ...params,
        (err, data) => {
          err
            ? reject(err)
            : resolve(data);
        }
      ]
    )
  })
}

module.exports = wrapper;
