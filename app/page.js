'use client'

import { useState, useEffect } from 'react';
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import Link from 'next/link';

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });
const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
        await web3auth.initModal();
        await web3auth.initModal();
        setProvider(web3auth.provider);

      await web3auth.initModal();
        setProvider(web3auth.provider);

      if (web3auth.connected) {
        setLoggedIn(true);
      }
    };
    init();
  }, []);

  const login = async () => {
    await web3auth.connect();
    setLoggedIn(true);
  };

  const logout = async () => {
    await web3auth.logout();
    setLoggedIn(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {loggedIn && (
        <aside className="w-64 bg-white shadow-md">
          <nav className="mt-5">
            <Link href="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Home</Link>
            <Link href="/my-attestations" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">My Attestations</Link>
            <Link href="/request-attestation" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Request Attestation</Link>
            <Link href="/attesters" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Attesters</Link>
            <button onClick={logout} className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200">Logout</button>
          </nav>
        </aside>
      )}
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6">Welcome to LegacyLock</h1>
        <p className="text-xl mb-8">Secure and verify your important documents with blockchain technology.</p>
        
        {!loggedIn ? (
          <button onClick={login} className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300">
            Connect Wallet
          </button>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Register as an Attester</h2>
              <p className="mb-4">Join our network of trusted attesters and help verify important documents and claims.</p>
              <Link href="/register-attester" className="bg-green-500 text-white px-4 py-2 rounded inline-block hover:bg-green-600 transition duration-300">Register Now</Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Request Attestation</h2>
              <p className="mb-4">Get your documents or claims verified by our network of trusted attesters.</p>
              <Link href="/request-attestation" className="bg-green-500 text-white px-4 py-2 rounded inline-block hover:bg-green-600 transition duration-300">Request Now</Link>
            </div>
          </div>
        )}
        
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">1. Connect</h3>
              <p>Connect your wallet to get started with LegacyLock.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">2. Request</h3>
              <p>Submit your documents for attestation by our trusted network.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">3. Verify</h3>
              <p>Receive blockchain-backed verification for your important documents.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}