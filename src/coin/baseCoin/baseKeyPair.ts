import * as Crypto from '../../utils/crypto';
import { KeyPairOptions, ExtendedKeys } from './iface';
import { AddressFormat } from './enum';
import { HDNode, ECPair } from 'bitgo-utxo-lib';

/**
 * Base keys and address management.
 */
export abstract class BaseKeyPair {
  // Implementation of the HD protocol (BIP32). Only available when creating a KeyPair from a seed,
  // or extended keys
  protected hdNode?: HDNode;
  protected keyPair: ECPair;

  /**
   * Public constructor. By default, creates a key pair with a random master seed.
   *
   * @param {KeyPairOptions} source Either a master seed, a private key (extended or raw), or a public key
   *     (extended, compressed, or uncompressed)
   */
  protected constructor(protected source?: KeyPairOptions) {}

  /**
   * Build a Hierarchical Deterministic node or an ECPair from a private key.
   *
   * @param {string} prv An extended or raw private key
   */
  protected recordKeysFromPrivateKey(prv: string): void {
    if (Crypto.isValidXprv(prv)) {
      this.hdNode = HDNode.fromBase58(prv);
    } else if (Crypto.isValidPrv(prv)) {
      // Cannot create the HD node without the chain code, so create a regular Key Chain
      this.keyPair = ECPair.fromPrivateKeyBuffer(new Buffer(prv, 'hex'));
    } else {
      throw new Error('Unsupported private key');
    }
  }

  /**
   * Build a Hierarchical Deterministic node or an ECPair from a public key.
   *
   * @param {string} pub - An extended, compressed, or uncompressed public key
   */
  protected recordKeysFromPublicKey(pub: string): void {
    if (Crypto.isValidXpub(pub)) {
      this.hdNode = HDNode.fromBase58(pub);
    } else if (Crypto.isValidPub(pub)) {
      // Cannot create an HD node without the chain code, so create a regular Key Chain
      this.keyPair = ECPair.fromPublicKeyBuffer(new Buffer(pub, 'hex'));
    } else {
      throw new Error('Unsupported public key: ' + pub);
    }
  }

  /**
   * Get the extended public key, and the private key if one is available. This is only possible
   * when the key pair was created from a seed or extended keys.
   *
   * @returns {ExtendedKeys} The Extended keys object
   */
  getExtendedKeys(): ExtendedKeys {
    if (!this.hdNode) {
      throw new Error('Cannot get extended keys');
    }
    const result: ExtendedKeys = {
      xpub: this.hdNode.neutered().toBase58(),
    };
    // A neutered HD node means it only contains the public key information
    if (!this.hdNode.isNeutered()) {
      result.xprv = this.hdNode.toBase58();
    }
    return result;
  }

  /**
   * Returns the keys in the protocol default key format
   */
  abstract getKeys(): any;

  /**
   * Returns the address in the protocol default format
   */
  abstract getAddress(format?: AddressFormat): string;
}
