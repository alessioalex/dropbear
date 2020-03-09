'use strict';

const { isOpeningParenthesis, isClosingParenthesis } = require('./identify');
const { specialForms } = require('./special-forms');
const { peek, pop } = require('./utilities');

const parenthesize = tokens => {
  const token = pop(tokens);

  if (isOpeningParenthesis(token.value)) {
    const expression = [];

    while (!isClosingParenthesis(peek(tokens).value)) {
      expression.push(parenthesize(tokens));
    }

    tokens.pop();
    return expression;
  }

  return token;
};

const parse = tokens => {
  if (Array.isArray(tokens)) {
    const [first, ...rest] = tokens;

    return {
      type: 'CallExpression',
      name: first.value,
      arguments: rest.map(parse)
    };
  }

  const token = tokens;

  if (token.type === 'Number') {
    return {
      type: 'NumericLiteral',
      value: token.value,
    };
  }

  if (token.type === 'String') {
    return {
      type: 'StringLiteral',
      value: token.value,
    };
  }

  if (token.type === 'Name') {
    return {
      type: 'Identifier',
      name: token.value,
    };
  }

  // My version
  /*/
  if (token.type === 'Parenthesis' && isOpeningParenthesis(token.value)) {
    const ast = {
      type: 'CallExpression'
    };

    if (peek(tokens).type === 'Name') {
      ast.name = peek(tokens).value;
      ast.arguments = [];
      pop(tokens);
    }

    while (!(peek(tokens).type === 'Parenthesis' && isClosingParenthesis(peek(tokens).value))) {
      ast.arguments.push(parse(tokens));
    }

    return ast;
  }
  //*/

};

module.exports = { parse: tokens => parse(parenthesize(tokens)) };
