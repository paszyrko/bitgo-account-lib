/**
 * Ethereum transaction model
 */
import { BaseTransaction } from '../baseCoin';
import { BaseKey } from '../baseCoin/iface';
import { InvalidTransactionError } from '../baseCoin/errors';
import { KeyPair } from './keyPair';
import { ParsedTransaction } from './iface';
import { Utils } from './';
import { BaseCoin as CoinConfig } from '@bitgo/statics/dist/src/base';

export class Transaction extends BaseTransaction {
  private _parsedTransaction?: ParsedTransaction; // transaction in JSON format
  private _encodedTransaction?: string; // transaction in hex format
  private _source: string;
  /**
   * Public constructor.
   *
   * @param {Readonly<CoinConfig>} coinConfig
   */
  constructor(coinConfig: Readonly<CoinConfig>) {
    super(coinConfig);
  }

  canSign(key: BaseKey): boolean {
    return false;
  }

  /**
   * Sign the transaction with the provided key. It does not check if the signer is allowed to sign
   * it or not.
   *
   * @param {KeyPair} keyPair The key to sign the transaction with
   */
  async sign(keyPair: KeyPair): Promise<void> {
    // Check if there is a transaction to sign
    if (!this._parsedTransaction) {
      throw new InvalidTransactionError('Empty transaction');
    }
    // Get the transaction body to sign
    const encodedTransaction = this._parsedTransaction; //TODO: format the transaction to encoded Buffer
    const signedTransaction = await Utils.sign(); //TODO: Implement sign function in utils
  }

  toBroadcastFormat(): any {
    return ''; //TODO: Implement toBroadCastFormat for Ethereum
  }

  toJson(): any {
    return ''; //TODO: Implement toJson for Ethereum
  }
}
