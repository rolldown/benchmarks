/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {AnyNode, AnyFunction} from '@romejs/js-ast';

export default function(node: AnyNode): node is AnyFunction {
  return node.type === 'FunctionDeclaration' || node.type ===
    'FunctionExpression' || node.type === 'ObjectMethod' || node.type ===
    'ArrowFunctionExpression' || node.type === 'ClassMethod';
}
