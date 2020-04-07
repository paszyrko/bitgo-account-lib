import should from 'should';
import BN from 'bn.js';
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
} from '../../../../src/coin/eth/utils';

const STRING_HEX = '0xa43f0BDd451E39C7AF20426f43589DEFAd4335E6';
const STRING_NO_HEX = 'a43f0BDd451E39C7AF20426f43589DEFAd4335E6';
const ARRAY = ['1', '2', '3'];

const FIELD = { allowZero: false, allowLess: true, length: 42, name: '' };
const BN_ = new BN('dead', 16);

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
