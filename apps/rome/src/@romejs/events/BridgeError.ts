import Bridge from './Bridge';

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export default class BridgeError extends Error {
  constructor(message: string, bridge: Bridge) {
    super(message);
    this.bridge = bridge;
  }

  bridge: Bridge;
}