/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Builder from '../../Builder';
import {Tokens} from '../../tokens';
import {
  ImportSpecifierLocal,
  importSpecifierLocal,
  AnyNode,
} from '@romejs/js-ast';

export default function(
  builder: Builder,
  node: AnyNode,
): Tokens {
  node = importSpecifierLocal.assert(node);
  throw new Error('unimplemented');
}
