import BN = require('bn.js');

/**
 * Any object that can be transformed into a `Buffer`
 */
export interface TransformableToBuffer {
  toBuffer(): Buffer;
}

/**
 * A hex string prefixed with `0x`.
 */
export type PrefixedHexString = string;

/**
 * A Buffer, hex string prefixed with `0x`, Number, or an object with a toBuffer method such as BN.
 */
export type BufferLike = Buffer | TransformableToBuffer | PrefixedHexString | number;

/**
 * A transaction's data.
 */
export interface SigData {
  /**
   * EC recovery ID.
   */
  v?: number;

  /**
   * EC signature parameter.
   */
  r?: number;

  /**
   * EC signature parameter.
   */
  s?: number;
}
/**
 * A transaction's data.
 */
export interface TxData {
  /**
   * The transaction's gas limit.
   */
  gasLimit?: BufferLike;

  /**
   * The transaction's gas price.
   */
  gasPrice?: BufferLike;

  /**
   * The transaction's the address is sent to.
   */
  to?: BufferLike;

  /**
   * The transaction's nonce.
   */
  nonce?: BufferLike;

  /**
   * The chainId's nonce.
   */
  chainId?: BufferLike;

  /**
   * This will contain the data of the message or the init of a contract
   */
  data?: BufferLike;

  /**
   * EC recovery ID.
   */
  v?: BufferLike;

  /**
   * EC signature parameter.
   */
  r?: BufferLike;

  /**
   * EC signature parameter.
   */
  s?: BufferLike;

  /**
   * The amount of Ether sent.
   */
  value?: BufferLike;
}

/**
 * The data of a fake (self-signing) transaction.
 */
export interface FakeTxData extends TxData {
  /**
   * The sender of the Tx.
   */
  from?: BufferLike;
}

export type Input = Buffer | string | number | Uint8Array | BN | null;

export interface Decoded {
  data: Buffer | Buffer[];
  remainder: Buffer;
}

export interface FieldData {
  allowZero: boolean;
  allowLess: boolean;
  length: number;
  name: string;
}
