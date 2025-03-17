import { Wallet } from 'ethers';
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';
import { Buffer } from 'buffer';

const ECPair = ECPairFactory(ecc);

export function generateAddresses(privateKey: string) {
  // Remove '0x' prefix if present
  const cleanPrivateKey = privateKey.startsWith('0x') ? privateKey.slice(2) : privateKey;

  // Ethereum Address Generation
  const ethWallet = new Wallet(privateKey);
  const ethereumAddress = ethWallet.address;

  // Bitcoin Address Generation
  const keyPair = ECPair.fromPrivateKey(Buffer.from(cleanPrivateKey, 'hex'));

  // Bitcoin Mainnet Address (P2PKH)
  const { address: bitcoinMainnetP2PKHAddress } = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: bitcoin.networks.bitcoin,
  });

  // Bitcoin Mainnet Address (P2WPKH)
  const { address: bitcoinMainnetP2WPKHAddress } = bitcoin.payments.p2wpkh({
    pubkey: keyPair.publicKey,
    network: bitcoin.networks.bitcoin,
  });

  // Bitcoin Testnet Address (P2PKH)
  const { address: bitcoinTestnetP2PKHAddress } = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: bitcoin.networks.testnet,
  });

  // Bitcoin Testnet Address (P2WPKH)
  const { address: bitcoinTestnetP2WPKHAddress } = bitcoin.payments.p2wpkh({
    pubkey: keyPair.publicKey,
    network: bitcoin.networks.testnet,
  });

  return {
    ethereumAddress,
    bitcoinMainnetP2PKHAddress,
    bitcoinMainnetP2WPKHAddress,
    bitcoinTestnetP2PKHAddress,
    bitcoinTestnetP2WPKHAddress,
  };
}
