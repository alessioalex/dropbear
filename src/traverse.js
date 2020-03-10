// My version
/*/
const visit = (visitor, node, step = 'enter') => {
  if (visitor && (step in visitor)) {
    visitor[step]({ node });
  }
};

const traverse = (node, visitor) => {
  const nodeVisitor = visitor[node.type];

  visit(nodeVisitor, node, 'enter');

  if (node.arguments) {
    node.arguments.forEach((subnode) => {
      traverse(subnode, visitor);
    });
  }

  visit(nodeVisitor, node, 'exit');
};
*/

const traverseNode = ({ node, parent = null, visitor }) => {
  const methods = visitor[node.type];

  if (methods && methods.enter) {
    methods.enter({ node, parent });
  }

  if (node.arguments) {
    traverseArray({ array: node.arguments, parent: node, visitor })
  }

  if (methods && methods.exit) {
    methods.exit({ node, parent });
  }
};

const traverseArray = ({ array, parent, visitor }) => {
  array.forEach((node) => {
    traverseNode({ node, parent, visitor });
  });
};

const traverse = (node, visitor) => {
  traverseNode({ node, visitor });
};

module.exports = { traverse };
