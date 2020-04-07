import { TransactionType } from '../../../../src/coin/baseCoin/';
import { getBuilder, Eth } from '../../../../src';
import should from 'should';

describe('Eth Transaction builder', function() {
  before(function() {
    this.skip(); //TODO: Remove this when the tests are fixed
  });
  const defaultKeyPair = new Eth.KeyPair({
    prv:
      'xprv9s21ZrQH143K3D8TXfvAJgHVfTEeQNW5Ys9wZtnUZkqPzFzSjbEJrWC1vZ4GnXCvR7rQL2UFX3RSuYeU9MrERm1XBvACow7c36vnz5iYyj2',
  });

  describe('should build', () => {
    it('an init transaction', async () => {
      const txBuilder: any = getBuilder('eth');
      txBuilder.type(TransactionType.WalletInitialization);
      txBuilder.fee({
        fee: '10',
        gasLimit: '1000',
      });
      txBuilder.branch('chainId'); //Map chainId to branch
      const source = {
        prv: '8CAA00AE63638B0542A304823D66D96FF317A576F692663DB2F85E60FAB2590C',
      };
      const sourceKeyPair = new Eth.KeyPair(source);
      txBuilder.source(sourceKeyPair.getAddress()); //TODO: Implement get address from prv, is the one that pays the fee
      txBuilder.counter('0'); //This would be nonce
      txBuilder.owner(
        //TODO: change for address or valid public key
        new Eth.KeyPair({ pub: 'sppk7ZWB8diU2TWehxdkWCV2DTFvn1hPz4qLjiD3nJQozKnoSEnSC8b' }).getAddress(),
      );
      txBuilder.owner(new Eth.KeyPair({ pub: 'sppk7ZWB8diU2TWehxdkWCV2DTFvn1hPz4qLjiD3nJQozKnoSEnSC8b' }).getAddress());
      txBuilder.owner(new Eth.KeyPair({ pub: 'sppk7ZWB8diU2TWehxdkWCV2DTFvn1hPz4qLjiD3nJQozKnoSEnSC8b' }).getAddress());
      const tx = await txBuilder.build(); //build without sign
      //TODO: Add to broadcast format to check if it's possible to send using Web3

      tx.id.should.equal('');
      tx.type.should.equal(TransactionType.WalletInitialization);
      tx.source.should.equal(''); //TODO: Add calculated getAddress()
      should.equal(tx.inputs.length, 1);
      should.equal(tx.outputs.length, 1);
      tx.inputs[0].address.should.equal(''); //TODO: Add calculated getAddress()
      tx.inputs[0].value.should.equal('1000010'); //TODO: Check if it's related to initial balance and fee
      tx.outputs[0].address.should.equal('');
      tx.outputs[0].value.should.equal('1000000');
      tx.signature.length.should.equal(0);
      Object.keys(tx.getIndexesByTransactionType()).length.should.equal(1);
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
      txBuilder.branch('chainId'); //Map chainId to branch
      const source = {
        prv: '8CAA00AE63638B0542A304823D66D96FF317A576F692663DB2F85E60FAB2590C',
      };
      const sourceKeyPair = new Eth.KeyPair(source);
      txBuilder.source(sourceKeyPair.getAddress()); //TODO: Implement get address from prv
      txBuilder.counter('0'); //This would be nonce
      txBuilder.owner('sppk7ZWB8diU2TWehxdkWCV2DTFvn1hPz4qLjiD3nJQozKnoSEnSC8b');
      txBuilder.owner('sppk7ZWB8diU2TWehxdkWCV2DTFvn1hPz4qLjiD3nJQozKnoSEnSC8b');
      txBuilder.owner('sppk7ZWB8diU2TWehxdkWCV2DTFvn1hPz4qLjiD3nJQozKnoSEnSC8b');
      txBuilder.sign({ key: defaultKeyPair.getKeys().prv });
      const tx = await txBuilder.build(); //shoud build and sign
      //TODO: Add to broadcast format to check if it's possible to send using Web3
      tx.id.should.equal('opNfjjEfWk7HsnY8fQrUoPFuXZfABweubA6D4bVScmqoVzcZVFA');
      tx.type.should.equal(TransactionType.WalletInitialization);
      tx.source.should.equal('tz2PtJ9zgEgFVTRqy6GXsst54tH3ksEnYvvS');
      should.equal(tx.inputs.length, 1);
      should.equal(tx.outputs.length, 1);
      tx.inputs[0].address.should.equal('tz2PtJ9zgEgFVTRqy6GXsst54tH3ksEnYvvS');
      tx.inputs[0].value.should.equal('1004764');
      tx.outputs[0].address.should.equal('KT1J9LfhDV6FQxR7aMaK7R6Rw8mBpfhP5MA3');
      tx.outputs[0].value.should.equal('1000000');
      tx.signature.length.should.equal(1);
      tx.signature[0].should.equal(
        'sigVD57haAMCobHrCwH9ABfbFvdmyR9ZspZC3Zihb9tEPfhtzCKS1F8fLoVpodvor3PUoo7ry4j46xYETEzELmtnrNTaTPX4',
      );
      Object.keys(tx.getIndexesByTransactionType()).length.should.equal(1);
    });
  });
});
