/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {TSAsExpression, tsAsExpression, AnyNode} from '@romejs/js-ast';
import {Builder} from '@romejs/js-formatter';
import {Tokens, space, word} from '../../tokens';

export default function(builder: Builder, node: AnyNode): Tokens {
  node = tsAsExpression.assert(node);

  if (builder.options.typeAnnotations) {
    return [
      ...builder.tokenize(node.expression, node),
      space,
      word('as'),
      space,
      ...builder.tokenize(node.typeAnnotation, node),
    ];
  } else {
    return builder.tokenize(node.expression, node);
  }
}
