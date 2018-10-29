# Wrap callback to promise

this package now does assume callback in this specific format:

```Javascript
(err, data) => {}
```

## How to use

Call this module with you function that needs callback, and it will return a promise that has result as the parameter in then and err as the parameter in catch.

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