/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Scope} from '../../scopes';
import {
  ExportAllDeclaration,
  exportAllDeclaration,
  AnyNode,
} from '@romejs/js-ast';
import Hub from '../../Hub';

export default function(
  node: AnyNode,
  scope: Scope,
  {evaluator}: Hub,
) {
  node = exportAllDeclaration.assert(node);
  evaluator.addExportAll(node.source.value);
}
