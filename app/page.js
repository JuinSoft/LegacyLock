'use client'

import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { useEffect, useState } from "react";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-4xl font-bold mb-8">LegacyLock</h1>
          <div className="flex space-x-8">
            {!loggedIn ? (
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={login}>Connect Wallet</button>
            ) : (
              <>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">Register as an Attester</h2>
                  <p className="mb-4">Join our network of trusted attesters and help verify important documents and claims.</p>
                  <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={getUserInfo}>Register Now</button>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">Request Attestation</h2>
                  <p className="mb-4">Get your documents or claims verified by our network of trusted attesters.</p>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">Request Now</button>
                </div>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={logout}>Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
      <footer className="w-full text-center mt-8">
        <p className="text-sm">&copy; 2024 LegacyLock. All rights reserved.</p>
        <p className="text-sm">Built with ❤️ for <a href="https://ethglobal.com/events/ethonline2024" target="_blank" rel="noopener noreferrer">ETHOnline 2024</a></p>
      </footer>
    </main>
  );
}