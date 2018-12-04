# Wrap callback to promise



this package now does assume callback in this specific format:

```Javascript
(err, data) => {}
```

or you can set complex to true in options, then all the params for the callback will be available as an array in 'then'

```Javascript
func(..., (param1, param2, param3, ...) => {})
```

will become

```Javascript
func(...).then(([param1, param2, param3, ...]) => {})
```

## How to use

Call this module with you function that needs callback, and it will return a promise

### Example

the followings are equivalent

```Javascript
const readFile = fs.readFile('dist', (err, data) => {
  if (!err) {
    console.log('successfully read file:', data);
    return;
  }
  console.log('error from fs read file:', err);
})
```

```Javascript
const callbackToPromise = require('simple-callback-promisify');
const readFilePromise = callbackToPromise(fs.readFile);
readFilePromise.then(
  data => console.log('successfully read file:', data);
).catch(
  err => console.log('error from fs read file:', err);
)
```

with complex set to true

```Javascript
const callbackToPromise = require('simple-callback-promisify');
const readFilePromise = callbackToPromise(fs.readFile, { complex: true });
readFilePromise.then(
  ([err, data]) => {
    if (err) {
      throw err;
    }
    console.log('successfully read file:', data);
  }
)
```

you can also use async/await

```Javascript
const callbackToPromise = require('simple-callback-promisify');
const readFilePromise = callbackToPromise(fs.readFile);
try {
  const data = await readFilePromise('dist');
  console.log('successfully read file:', data);
} catch (err) {
  console.log('error from fs read file:', err);
}
```