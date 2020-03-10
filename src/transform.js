const { traverse } = require('./traverse');

const transform = node => {
  traverse(node, {
    CallExpression: {
      enter({ node }) {
        if (specialForms[node.name]) {
          specialForms[node.name](node);
        }
      }
    }
  });

  return node;
};

const specialForms = {
  define(node) {
    [node.identifier, node.assignment] = node.arguments;
    node.type = 'VariableDeclaration';

    delete node.name;
    delete node.arguments;
  }
};

module.exports = { specialForms, transform };
