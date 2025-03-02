/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Scope} from '../../scopes';
import {
  FlowDeclareFunction,
  flowDeclareFunction,
  AnyNode,
} from '@romejs/js-ast';

export default function(node: AnyNode, scope: Scope) {
  node = flowDeclareFunction.assert(node);

  return scope.addBinding(node.id.name, scope.evaluate(
    node.id.meta.typeAnnotation,
  ));
}
