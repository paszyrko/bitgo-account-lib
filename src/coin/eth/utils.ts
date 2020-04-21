import { Buffer } from 'buffer';
import { Transaction } from 'ethereumjs-tx';
import EthereumCommon from 'ethereumjs-common';
import Web3 from 'web3'; //TODO: Remove this dependency when it's unused
import { SigningError } from '../baseCoin/errors';
import { TxData } from './iface';
import { KeyPair } from './keyPair';
import { walletSimpleByteCode, walletSimpleAbi } from './walletUtil';

const web3 = new Web3();

/**
 * Signs the transaction using the Eth elliptic curve
 *
 * @param {TxData} transactionData the transaction data to sign
 * @param {KeyPair} keyPair the signer's keypair
 * @returns {string} the transaction signed and encoded
 */
export async function sign(transactionData: TxData, keyPair: KeyPair): Promise<string> {
  if (!keyPair.getKeys().prv) {
    throw new SigningError('Missing private key');
  }
  const customCommon = EthereumCommon.forCustomChain(
    'ropsten',
    {
      name: 'testnet',
      networkId: 31,
      chainId: 31,
    },
    'petersburg',
  );
  const ethTx = new Transaction(formatTransaction(transactionData), { common: customCommon });
  const privateKey = Buffer.from(keyPair.getKeys().prv as string, 'hex');
  ethTx.sign(privateKey);
  const encodedTransaction = ethTx.serialize().toString('hex');
  return encodedTransaction;
}

/**
 * Format transaction to be signed
 *
 * @param {TxData} transactionData the transaction data with base values
 * @returns {TxData} the transaction data with hex values
 */
function formatTransaction(transactionData: TxData): TxData {
  return {
    gasLimit: '0x' + Number(transactionData.gasLimit as number).toString(16),
    gasPrice: '0x' + Number(transactionData.gasPrice as number).toString(16),
    nonce: '0x' + Number(transactionData.nonce as number).toString(16),
    data: transactionData.data,
  };
}

/**
 * Returns the smart contract encoded data
 *
 * @param {string[]} addresses - the contract signers
 * @returns {string} - the smart contract encoded data
 */
export function getContractData(addresses: string[]): string {
  const contract = new web3.eth.Contract(walletSimpleAbi);
  const contractToDeploy = contract.deploy({
    data: walletSimpleByteCode,
    arguments: [addresses],
  });
  return contractToDeploy.encodeABI();
}

/**
 * Returns whether or not the string is a valid Eth block hash
 *
 * @param {string} hash - the tx hash to validate
 * @returns {boolean} - the validation result
 */
export function isValidBlockHash(hash: string): boolean {
  console.log('Not implemented isValidBlockHash ', hash);
  return true;
}
