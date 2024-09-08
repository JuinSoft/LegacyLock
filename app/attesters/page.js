'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { ethers } from 'ethers';
import { contract } from '../utils/contract';
import { createAttestation } from '../utils/schemaInfo'; // Import createAttestation

export default function Attesters() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [attestationRequests, setAttestationRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null); // State for selected request
    const [showModal, setShowModal] = useState(false); // State for modal visibility

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
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contract.address, contract.abi, signer);
            const attestationCount = await contractInstance.attestationCount();
            const requests = [];
            const currentAddress = await signer.getAddress(); // Get the logged-in user's address
            for (let i = 0; i < attestationCount; i++) {
                const attestation = await contractInstance.attestations(i);
                console.log(attestation, currentAddress)
                if (attestation.attester.toLowerCase() === currentAddress.toLowerCase()) { // Check if attester address matches the logged-in user
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
        const requestAccounts = async () => {
            if (!web3auth.connected) {
                setLoggedIn(true);
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.listAccounts();
                console.log("Connected accounts: ", accounts);
            } else {
                console.log("connected to Web3Auth.");
            }
        };
        requestAccounts();
    }, []);

    const handleViewDetails = (requestId) => {
        const request = attestationRequests.find(req => req.id === requestId);
        setSelectedRequest(request);
        setShowModal(true);
    };

    const handleProvideAttestation = async (requestId) => {
        const request = attestationRequests.find(req => req.id === requestId);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        await createAttestation(request, signer);
        alert('Attestation provided successfully!');
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            <main className="flex-1 p-10">
                <h1 className="text-4xl font-bold mb-8">Attester Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {attestationRequests.length === 0 ? (
                        <p className="text-gray-400">No Requests found.</p>
                    ) : (
                        attestationRequests.map((request) => (
                            <div key={request.id} className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                <h2 className="text-xl font-semibold mb-2">Query from {request.name}</h2>
                                <p className="text-gray-400 mb-4">Request for: <span className="font-bold">{request.type}</span></p>
                                <p className="text-gray-400 mb-4">Document URL: <a href={request.documentURL} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{request.documentURL}</a></p>
                                <p className="text-gray-400 mb-4">Status: {request.isVerified ? 'Verified' : 'Pending'}</p>
                                <div className="flex space-x-2">
                                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300" onClick={() => handleViewDetails(request.id)}>View Details</button>
                                    <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300" onClick={() => handleProvideAttestation(request.id)}>Provide Attestation</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
            {showModal && selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white text-black p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Request Details</h2>
                        <p><strong>Name:</strong> {selectedRequest.name}</p>
                        <p><strong>Type:</strong> {selectedRequest.type}</p>
                        <p><strong>Document URL:</strong> <a href={selectedRequest.documentURL} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{selectedRequest.documentURL}</a></p>
                        <p><strong>Status:</strong> {selectedRequest.isVerified ? 'Verified' : 'Pending'}</p>
                        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}