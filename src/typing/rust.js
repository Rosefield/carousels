const typeFiles = [
  require('./rust/arithmetic.js'),
  require('./rust/array.js'),
  require('./rust/bool.js'),
  require('./rust/matrix.js'),
  require('./rust/std.js'),
  require('./rust/vector.js')
];

let allRules= [];
for (let i = 0; i < typeFiles.length; i++) {
  allRules = allRules.concat(typeFiles[i]);
}

module.exports = allRules;