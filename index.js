const wrapper = (
  fn,
  options = {},
) => (...params) => new Promise(
  (resolve, reject) => (options.complex
    ? fn(
      ...[
        ...params,
        (...callbackParams) => resolve(callbackParams),
      ],
    )
    : fn(
      ...[
        ...params,
        (err, data) => (err
          ? reject(err)
          : resolve(data)),
      ],
    )),
);

module.exports = wrapper;
