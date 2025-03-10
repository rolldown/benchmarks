/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {TSTypeOperator, tsTypeOperator, AnyNode} from '@romejs/js-ast';
import {Builder} from '@romejs/js-formatter';
import {Tokens, operator, space} from '../../tokens';

export default function(builder: Builder, node: AnyNode): Tokens {
  node = tsTypeOperator.assert(node);

  return [
    operator(node.operator),
    space,
    ...builder.tokenize(node.typeAnnotation, node),
  ];
}
