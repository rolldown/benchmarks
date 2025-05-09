/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Builder from '../../Builder';
import {Tokens, word, operator, space} from '../../tokens';
import {FlowOpaqueType, flowOpaqueType, AnyNode} from '@romejs/js-ast';

export default function(builder: Builder, node: AnyNode): Tokens {
  node = node.type === 'FlowDeclareOpaqueType'
    ? node
    : flowOpaqueType.assert(node);

  let tokens: Tokens = [
    word('opaque'),
    space,
    word('type'),
    space,
    ...builder.tokenize(node.id, node),
    ...builder.tokenize(node.typeParameters, node),
  ];

  if (node.supertype) {
    tokens = [
      ...tokens,
      operator(':'),
      space,
      ...builder.tokenize(node.supertype, node),
    ];
  }

  if (node.impltype) {
    tokens = [
      ...tokens,
      space,
      operator('='),
      space,
      ...builder.tokenize(node.impltype, node),
    ];
  }

  tokens.push(operator(';'));
  return tokens;
}
