function LocalFileData(path) {
  this.arrayBuffer = (() => {
    var buffer = require('fs').readFileSync(path);
    var arrayBuffer = buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    return [arrayBuffer];
  })();

  this.name = require('path').basename(path);

  this.type = require('mime-types').lookup(require('path').extname(path)) || undefined;
}

function constructFileFromLocalFileData(localFileData) {
  return new File(localFileData.arrayBuffer, localFileData.name, { type: localFileData.type });
};

module.exports = {
  LocalFileData,
  constructFileFromLocalFileData,
};
