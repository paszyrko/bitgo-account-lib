import should from 'should';
import BN from 'bn.js';
import { walletSimpleByteCode } from '../../../../src/coin/eth/walletUtil';
import {
  padToEven,
  isHexPrefixed,
  stripHexPrefix,
  stripZeros,
  isHexString,
  intToHex,
  intToBuffer,
  toBuffer,
  bufferToInt,
  getFieldValue,
  isValidBlockHash,
  isValidAddress,
  getContractData,
} from '../../../../src/coin/eth/utils';

const STRING_HEX = '0xa43f0BDd451E39C7AF20426f43589DEFAd4335E6';
const STRING_NO_HEX = 'a43f0BDd451E39C7AF20426f43589DEFAd4335E6';
const ARRAY = ['1', '2', '3'];

const FIELD = { allowZero: false, allowLess: true, length: 42, name: '' };
const BN_ = new BN('dead', 16);

describe('getContractData', function() {
  it('should return valid data', async () => {
    const args = [
      '0x2fa96fca36dd9d646AC8a4e0C19b4D3a0Dc7e456',
      '0xBa8eA9C3729686d7DB120efCfC81cD020C8DC1CB',
      '0xc37825D368eC3F50a1505542d8fFB25f7b6288f2',
    ];
    const contractData = getContractData(args);
    const expectedContractData =
      walletSimpleByteCode +
      '000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030000000000000000000000002fa96fca36dd9d646ac8a4e0c19b4d3a0dc7e456000000000000000000000000ba8ea9c3729686d7db120efcfc81cd020c8dc1cb000000000000000000000000c37825d368ec3f50a1505542d8ffb25f7b6288f2';
    should.equal(contractData, expectedContractData);
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
  it('strip hex prefix', async () => {
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
