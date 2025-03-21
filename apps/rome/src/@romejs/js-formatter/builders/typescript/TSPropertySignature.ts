/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  TSPropertySignature,
  tsPropertySignature,
  AnyNode,
} from '@romejs/js-ast';
import {Builder} from '@romejs/js-formatter';
import {Tokens, word, operator, space} from '../../tokens';

export default function(
  builder: Builder,
  node: AnyNode,
): Tokens {
  node = tsPropertySignature.assert(node);

  let tokens: Tokens = [];

  if (node.readonly) {
    tokens = [word('readonly'), space];
  }

  tokens = [...tokens, ...builder.tokenize(node.key, node)];

  if (node.optional) {
    tokens.push(operator('?'));
  }

  return [
    ...tokens,
    operator(':'),
    space,
    ...builder.tokenize(node.typeAnnotation, node),
    operator(';'),
  ];
}
