import should from 'should';
import { encodeParameters } from '../../../../src/coin/eth/abiCoder';

describe('isValidAddress', function() {
  it('should return valid result', async () => {
    const inputs = [{ name: 'allowedSigners', type: 'address[]' }];
    const args = [
      '0x2fa96fca36dd9d646AC8a4e0C19b4D3a0Dc7e456',
      '0xBa8eA9C3729686d7DB120efCfC81cD020C8DC1CB',
      '0xc37825D368eC3F50a1505542d8fFB25f7b6288f2',
    ];
    const args1 = [args];
    const resultEncodedParameters = encodeParameters(inputs, args1).replace('0x', '');
    should.equal(
      resultEncodedParameters,
      '000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030000000000000000000000002fa96fca36dd9d646ac8a4e0c19b4d3a0dc7e456000000000000000000000000ba8ea9c3729686d7db120efcfc81cd020c8dc1cb000000000000000000000000c37825d368ec3f50a1505542d8ffb25f7b6288f2',
    );
  });
});
