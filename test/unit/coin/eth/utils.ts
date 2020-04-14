import should from 'should';
import BN from 'bn.js';
import {
  sign,
  getContractData,
  isValidAddress,
  isValidBlockHash,
  padToEven,
  isHexPrefixed,
  stripHexPrefix,
  stripZeros,
  isHexString,
  intToHex,
  toHex,
  intToBuffer,
  toBuffer,
  bufferToInt,
  getFieldValue,
} from '../../../../src/coin/eth/utils';
import { KeyPair } from '../../../../src/coin/eth/keyPair';

const STRING_HEX = '0xa43f0BDd451E39C7AF20426f43589DEFAd4335E6';
const STRING_NO_HEX = 'a43f0BDd451E39C7AF20426f43589DEFAd4335E6';
const STRING_ZEROS = '0x000f0BDd451E39C7AF20426f43589DEFAd4335E6';
const STRING_WITHOUT_ZEROS = 'f0BDd451E39C7AF20426f43589DEFAd4335E6';
const ARRAY = ['1', '2', '3'];
const FIELD = { allowZero: false, allowLess: true, length: 64, name: '' };
const BN_ = new BN('18446744073709551615');
const BUFFER = new Buffer(['04', '00']);
const KEYPAIR = new KeyPair({ prv: 'E9574834182AAC2AD777D2851762E5D5D7BEAC1F36E09D12B3944A627BE1D360' });
const TXDATA = {
  nonce: 1,
  to: '0xBa8eA9C3729686d7DB120efCfC81cD020C8DC1CB',
  value: 125,
  chainId: 31,
  gasLimit: 12000,
  gasPrice: 10,
  data: '0x1',
};
const SIGN =
  'f84b010a822ee080800162a03e02aa98cc658c89ce3f33b88cf70ac0f6294d89d9224483c9cd98a26853c932a02d29a3a6c42167d3ee92dc9dd490baada4074add90b10e8b390a13ac0f4e2ac5';

describe('correct sign', function() {
  it('should return a correct signed transaction', async () => {
    const SIGNATURE = await sign(TXDATA, KEYPAIR);
    should.equal(SIGNATURE, SIGN);
  });
});

describe('isValidAddress', function() {
  it('should return valid result', async () => {
    should.equal(isValidAddress('0xBa8eA9C3729686d7DB120efCfC81cD020C8DC1CB'), true);
    should.equal(isValidAddress('0xBa8eA9C3729686d7DB120efCfC81cD020C8DC1CP'), false);
    should.equal(isValidAddress('0xBA8EA9C3729686D7DB120EFCfC81CD020C8DC1CB'), true);
    should.equal(isValidAddress('A8EA9C3729686D7DB120EFCfC81CD020C8DC1CB'), false);
  });
});

describe('Correct string', function() {
  it('should return if the string begin with Ox', async () => {
    should.equal(isHexPrefixed(STRING_HEX), true);
    should.equal(isHexPrefixed(STRING_NO_HEX), false);
  });
  it('should strip hex prefix', async () => {
    should.equal(stripHexPrefix(STRING_HEX), STRING_NO_HEX);
    should.equal(stripHexPrefix(STRING_NO_HEX), STRING_NO_HEX);
  });
  it('validate a hex string', async () => {
    should.equal(isHexString(STRING_HEX), true);
    should.equal(isHexString(STRING_NO_HEX), false);
  });
  it('should return an even length string', async () => {
    should.equal(padToEven('123'), '0123');
  });
  it('should strip zeros', async () =>{
    should.equal(stripZeros(STRING_ZEROS), STRING_WITHOUT_ZEROS);
});
});

describe('Correct buffer', function() {
  should.equal(Buffer.isBuffer(toBuffer(STRING_HEX)), true);
  should.equal(Buffer.isBuffer(toBuffer(STRING_NO_HEX)), true);
  should.equal(Buffer.isBuffer(toBuffer(1234)), true);
  should.equal(Buffer.isBuffer(toBuffer(BN_)), true);
  should.throws(() => toBuffer(ARRAY));
});

describe('Obtain field value', function() {
  should.equal(getFieldValue(0, FIELD).toString(), '');
});
describe('Correct conversion', function(){
  it('should convert to hex', async () => {
    should.equal(intToHex(1000),'0x3e8');
  });
  it('should convert int to buffer', async () => {
    should.equal(Buffer.isBuffer(intToBuffer(1234)), true);
  });
  it('should convert buffer to int', async () => {
    should.equal(bufferToInt(BUFFER), 1024);
  });
  it('should convert to hex', async () => {
    should.equal(toHex(STRING_HEX), STRING_HEX.toLowerCase());
    should.equal(toHex(1000), '0x3e8');
    should.equal(toHex(BUFFER), '0x0400');
    should.equal(toHex(toBuffer(STRING_HEX)), STRING_HEX.toLowerCase());
    should.equal(toHex('0x12e'), '0x12e');
  });
});
