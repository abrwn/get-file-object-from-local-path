# get-file-object-from-local-path

A utility to get a JS file object from a local file system path, when using Node together with a frontend client.

This solves the lack of interoperability between Node's `fs` file system (which the browser doesn't have access to), and the browser's `File` object type, which Node cannot create.

## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install get-file-object-from-local-path
```

## How to use

The utility contains two functions:
1. `LocalFileData()`: an object constructor function that takes an absolute path as an argument

Call this within a Node environment, passing an absolute path as a single argument, to construct a LocalFileData object containing all the data required to construct a file object in the frontend client:
- `name`: the name of the original file
- `arrayBuffer`: an arrayBuffer created using the buffer of the original file
- `type`: a MIME type based on the extension of the source file. Returns `undefined` if it can't be deduced.

```
// Within node.js
const fileData = new LocalFileData('path/to/file.txt')
```

2. `constructFileFromLocalFileData()`: a function to convert the provided LocalFileData object into a JS File object. This must be executed in the frontend code, which has access to the `window.File` constructor.

```
// Within browser code
const file = constructFileFromLocalFileData(fileData) // returns a JS File object
```

Once created, this file behaves the same way as a JS File object created using an HTML file picker, for example.

## Use cases

`get-file-object-from-local-path` was created to specify files to process and then send from the main thread to the renderer thread in Electron; however, a LocalFileData instance is a plain object that can be serialized/stringified and transmitted in any way required.

Example workflow:
1. Client sends the path of a file to the Node.js environment
2. Backend retrieves file, processes it and creates a LocalFileData object of the result
3. Node.js environment sends LocalFileData object to client
4. Client converts LocalFileData object to a File object for e.g. upload to server

## Limitations

Please note that although any file can be converted into a LocalFileData object, the entire file is loaded into memory when serializing (which will be required as a general rule when sending using Electron's ipcRenderer or as an http request).

**Files of >1GB will therefore cause the process to crash if serialization is required**. This package is intended for transmitting smaller pieces of data and is not suitable for e.g. large videos.

## License

[MIT](LICENSE)
