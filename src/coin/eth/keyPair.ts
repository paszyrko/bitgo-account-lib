import { DefaultKeys } from '../baseCoin/iface';
import { isPrivateKey, isPublicKey, KeyPairOptions } from '../baseCoin/iface';
import { BaseKeyPair } from '../baseCoin/baseKeyPair';
import keccak from 'keccak';

/**
 * Ethereum keys and address management.
 */
export class KeyPair extends BaseKeyPair {
  /**
   * Public constructor. By default, creates a key pair with a random master seed.
   *
   * @param { KeyPairOptions } source Either a master seed, a private key (extended or raw), or a public key
   *     (extended, compressed, or uncompressed)
   */
  constructor(source?: KeyPairOptions) {
    super(source);
    if (source) {
      if (isPrivateKey(source)) {
        super.recordKeysFromPrivateKey(source.prv);
      } else if (isPublicKey(source)) {
        super.recordKeysFromPublicKey(source.pub);
      } else {
        throw new Error('Invalid key pair options');
      }
    } else {
      throw new Error('Invalid key pair options');
    }
  }

  /**
   * Ethereum default keys format is raw private and uncompressed public key
   *
   * @returns { DefaultKeys }The keys in the protocol default key format
   */
  getKeys(): DefaultKeys {
    const result: DefaultKeys = {
      pub: this.keyPair.Q.getEncoded(false)
        .toString('hex')
        .toUpperCase(),
    };

    if (this.keyPair.d) {
      result.prv = this.keyPair.d
        .toBuffer(32)
        .toString('hex')
        .toUpperCase();
    }
    return result;
  }

  /**
   * Get an Ethereum public address
   *
   * @returns {string} The address derived from the private key or public key
   */
  getAddress(): string {
    const publicKey = Buffer.from(this.getKeys().pub.slice(2), 'hex'); //first two characters identify a public key
    const pk = publicKey;
    const address = keccak('keccak256')
      .update(pk)
      .digest('hex');
    const buf2 = Buffer.from(address, 'hex');
    const ethAddress = '0x' + buf2.slice(-20).toString('hex');
    return ethAddress;
  }
}