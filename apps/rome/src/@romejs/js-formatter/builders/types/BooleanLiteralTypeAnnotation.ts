/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Builder from '../../Builder';
import {Tokens, word} from '../../tokens';
import {
  BooleanLiteralTypeAnnotation,
  booleanLiteralTypeAnnotation,
  AnyNode,
} from '@romejs/js-ast';

export default function(
  builder: Builder,
  node: AnyNode,
): Tokens {
  node = booleanLiteralTypeAnnotation.assert(node);
  return [word(node.value ? 'true' : 'false')];
}
