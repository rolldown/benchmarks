/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  NeverKeywordTypeAnnotation,
  neverKeywordTypeAnnotation,
  AnyNode,
} from '@romejs/js-ast';

export default function(node: AnyNode) {
  node = neverKeywordTypeAnnotation.assert(node);
  throw new Error('unimplemented');
}
