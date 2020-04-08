import { TransactionType } from '../../../../src/coin/baseCoin/';
import { getBuilder, Eth } from '../../../../src';
import should from 'should';

describe('Eth Transaction builder', function() {
  /*before(function() {
    this.skip(); //TODO: Remove this when the tests are fixed
  });*/
  const defaultKeyPair = new Eth.KeyPair({
    prv: '8CAA00AE63638B0542A304823D66D96FF317A576F692663DB2F85E60FAB2590C',
  });

  describe('should build', () => {
    it('an init transaction', async () => {
      const txBuilder: any = getBuilder('eth');
      txBuilder.type(TransactionType.WalletInitialization);
      txBuilder.fee({
        fee: '10',
        gasLimit: '1000',
      });
      txBuilder.chainId(30);
      const source = {
        prv: '8CAA00AE63638B0542A304823D66D96FF317A576F692663DB2F85E60FAB2590C',
      };
      const sourceKeyPair = new Eth.KeyPair(source);
      //TODO: Implement get address from prv, is the one that pays the fee
      // to use sourceKeyPair.getAddress()
      txBuilder.source('0x386Fe4E3D2b6Acce93CC13d06e92B00aa50F429c');
      txBuilder.counter(1); //This would be the nonce
      //TODO: Implement get address from pub
      // to use new Eth.KeyPair({ pub: 'sppk7ZWB8diU2TWehxdkWCV2DTFvn1hPz4qLjiD3nJQozKnoSEnSC8b' }).getAddress()
      txBuilder.owner('0x386Fe4E3D2b6Acce93CC13d06e92B00aa50F429c');
      txBuilder.owner('0x7325A3F7d4f9E86AE62Cf742426078C3755730d5');
      txBuilder.owner('0x603e077acd3F01e81b95fB92ce42FF60dFf3D4C7');
      const tx = await txBuilder.build(); //build without sign
      //TODO: Add to broadcast format to check if it's possible to send using Web3

      tx.type.should.equal(TransactionType.WalletInitialization);
      const txJson = tx.toJson();
      txJson.gasLimit.should.equal('1000');
      txJson.gasPrice.should.equal('10');
      should.equal(txJson.nonce, 1);
      should.equal(txJson.chainId, 30);
      //TODO: The source should be set when signing or before
      //tx.source.should.equal('0x386Fe4E3D2b6Acce93CC13d06e92B00aa50F429c');
      //TODO: check commented asserts to see if they are needed
      //should.equal(tx.inputs.length, 1);
      //should.equal(tx.outputs.length, 1);
      //TODO: Add the signatures
      //tx.signature.length.should.equal(0);
    });
  });

  describe('should sign', () => {
    it('an init transaction', async () => {
      const txBuilder: any = getBuilder('eth');
      txBuilder.type(TransactionType.WalletInitialization);
      txBuilder.fee({
        fee: '10',
        gasLimit: '1000',
      });
      txBuilder.chainId(30);
      const source = {
        prv: '8CAA00AE63638B0542A304823D66D96FF317A576F692663DB2F85E60FAB2590C',
      };
      const sourceKeyPair = new Eth.KeyPair(source);
      //TODO: Implement get address from prv, is the one that pays the fee
      // to use sourceKeyPair.getAddress()
      txBuilder.source('0x386Fe4E3D2b6Acce93CC13d06e92B00aa50F429c');
      txBuilder.counter(1); //This would be the nonce
      //TODO: Implement get address from pub
      // to use new Eth.KeyPair({ pub: 'sppk7ZWB8diU2TWehxdkWCV2DTFvn1hPz4qLjiD3nJQozKnoSEnSC8b' }).getAddress()
      txBuilder.owner('0x386Fe4E3D2b6Acce93CC13d06e92B00aa50F429c');
      txBuilder.owner('0x7325A3F7d4f9E86AE62Cf742426078C3755730d5');
      txBuilder.owner('0x603e077acd3F01e81b95fB92ce42FF60dFf3D4C7');
      txBuilder.sign({ key: defaultKeyPair.getKeys().prv });
      const tx = await txBuilder.build(); //shoud build and sign
      //TODO: Add to broadcast format to check if it's possible to send using Web3

      tx.type.should.equal(TransactionType.WalletInitialization);
      //TODO: The source should be set when signing or before
      //tx.source.should.equal('0x386Fe4E3D2b6Acce93CC13d06e92B00aa50F429c');
      //TODO: check commented asserts to see if they are needed
      //should.equal(tx.inputs.length, 1);
      //should.equal(tx.outputs.length, 1);
      //TODO: Add the signatures
      //tx.signature.length.should.equal(0);
    });
  });
});
