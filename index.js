function LocalFileData(path) {
  this.arrayBuffer = (() => {
    const buffer = require('fs').readFileSync(path);
    const arrayBuffer = buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    return [arrayBuffer];
  })();

  this.name = require('path').basename(path);

  this.type = require('mime-types').lookup(require('path').extname(path)) || undefined;
}

const constructFileFromLocalFileData = ({ arrayBuffer, name, type }) => new File(arrayBuffer, name, { type });

module.exports = {
  LocalFileData,
  constructFileFromLocalFileData,
};
