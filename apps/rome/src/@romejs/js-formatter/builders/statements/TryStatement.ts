/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Builder from '../../Builder';
import {Tokens, space, word, concat} from '../../tokens';
import {tryStatement, AnyNode} from '@romejs/js-ast';

export default function(builder: Builder, node: AnyNode): Tokens {
  node = tryStatement.assert(node);

  const tokens: Tokens = [
    word('try'),
    space,
    concat(builder.tokenize(node.block, node)),
    space,
    concat(builder.tokenize(node.handler, node)),
  ];

  if (node.finalizer) {
    return [
      concat(tokens),
      space,
      word('finally'),
      space,
      concat(builder.tokenize(node.finalizer, node)),
    ];
  } else {
    return tokens;
  }
}
