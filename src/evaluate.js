const { environment } = require('./standard-library');
const last = collection => collection[collection.length - 1];

const apply = (node) => {
  const fn = environment[node.name];
  const args = node.arguments.map(evaluate);

  if (typeof fn !== 'function') {
    throw new Error(`${node.name} is not a function`);
  }

  return fn(...args);
};

const getIdentifier = (node) => {
  if (environment[node.name]) {
    return environment[node.name];
  }

  throw new ReferenceError(`${node.name} is not defined`);
};

const evaluate = (node) => {
  if (node.type === 'CallExpression') { return apply(node); }

  if (node.value) {
    return node.value;
  }

  if (node.type === 'Identifier') {
    return getIdentifier(node);
  }
};

// My version
/*/
const evaluate = (node) => {
  if (node.value) {
    return node.value;
  }

  if (node.type === 'CallExpression') {
    return environment[node.name](...node.arguments.map(evaluate));
  }

  if (node.type === 'Identifier') {
    return environment[node.name];
  }
};
//*/

module.exports = { evaluate };
