'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { ethers } from 'ethers';
import { contract } from '../utils/contract';

export default function Attesters() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [attestationRequests, setAttestationRequests] = useState([]);

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


    async function fetchAttestationRequests() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contractInstance = new ethers.Contract(contract.address, contract.abi, provider);
            const attestationCount = await contractInstance.attestationCount();
            const requests = [];
            const currentAddress = await provider.getSigner().getAddress(); // Get the logged-in user's address
            for (let i = 0; i < attestationCount; i++) {
                const attestation = await contractInstance.attestations(i);
                if (attestation.attester === currentAddress) { // Check if attester address matches the logged-in user
                    requests.push(attestation);
                }
            }
            return requests;
        }
        return [];
    }

    useEffect(() => {
        const loadRequests = async () => {
            const requests = await fetchAttestationRequests();
            setAttestationRequests(requests);
        };
        loadRequests();
    }, []);

    useEffect(() => {
        if (web3auth.connected) {
            setLoggedIn(true);
        }
        console.log(web3auth.connected);
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            {loggedIn && (
                <aside className="w-64 bg-gray-800 p-6">
                    <nav className="space-y-2">
                        <Link href="/" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">Home</Link>
                        <Link href="/my-attestations" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">My Attestations</Link>
                        <Link href="/request-attestation" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">Request Attestation</Link>
                        <Link href="/attesters" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">Attesters</Link>
                    </nav>
                </aside>
            )}
            <main className="flex-1 p-10">
                <h1 className="text-4xl font-bold mb-8">Attester Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {attestationRequests.map((request) => (
                        <div key={request.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-2">Query from {request.name}</h2>
                            <p className="text-gray-400 mb-4">Request for {request.type}</p>
                            <div className="flex space-x-2">
                                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">View Details</button>
                                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300">Provide Attestation</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}