/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Scope} from '../../scopes';
import {
  ExpressionStatement,
  expressionStatement,
  AnyNode,
} from '@romejs/js-ast';

export default function(node: AnyNode, scope: Scope) {
  node = expressionStatement.assert(node);

  return scope.evaluate(node.expression);
}
