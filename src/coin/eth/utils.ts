import Web3 from 'web3'; //TODO: add web3 to package.json

export type ByteArray = number[];
const walletSimpleByteCode = 'contractBytecode';
const walletSimpleAbi = [];
const web3 = new Web3('https://public-node.testnet.rsk.co'); //TODO: This hardcoded server address will be removed

/**
 * Signs the transaction using the Eth elliptic curve
 *
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function sign(): Promise<void> {
  //TODO: Remove eslint-disable-next-line when implementing this method
}

/**
 * Returns the smart contract encoded data
 *
 * @param {string[]} args - the contract signers
 * @returns {string} - the smart contract encoded data
 */
export function getContractData(args: string[]): string {
  const contract = new web3.eth.Contract(walletSimpleAbi);
  const contractToDeploy = contract.deploy({
    data: walletSimpleByteCode,
    arguments: args,
  });

  return contractToDeploy.encodeABI();
}

/**
 * Returns whether or not the string is a valid Eth address
 *
 * @param {string} hash - the address to validate
 * @returns {boolean} - the validation result
 */
export function isValidAddress(hash: string): boolean {
  //TODO: implement Eth address validation
  console.log(hash);
  return true;
}

/**
 * Returns whether or not the string is a valid Eth block hash
 *
 * @param {string} hash - the address to validate
 * @returns {boolean} - the validation result
 */
export function isValidBlockHash(hash: string): boolean {
  //TODO: implement Eth block hash validation
  console.log(hash);
  return true;
}
