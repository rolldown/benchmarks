/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Scope} from '../../scopes';
import {FunctionExpression, functionExpression, AnyNode} from '@romejs/js-ast';
import executeFunction from '../../utils/executeFunction';

export default function(node: AnyNode, scope: Scope) {
  node = functionExpression.assert(node);
  return executeFunction(node, scope, true);
}
