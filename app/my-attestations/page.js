'use client'

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contract } from '../utils/contract';

export default function MyAttestations() {
    const [attestations, setAttestations] = useState([]);

    useEffect(() => {
        const fetchAttestations = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contractInstance = new ethers.Contract(contract.address, contract.abi, signer);
                const myAttestations = await contractInstance.getMyRequestedAttestations();
                setAttestations(myAttestations);
            }
        };
        fetchAttestations();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Attestations</h1>
            {attestations.length === 0 ? (
                <p className="text-gray-400">No attestations requests found! Please request one.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {attestations.map((attestation) => (
                        <div key={attestation.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-2">{attestation.title}</h2>
                            <p className="text-gray-400 mb-4">{attestation.description}</p>
                            <p className="text-gray-400 mb-4">Status: {attestation.isVerified ? 'Verified' : 'Pending'}</p>
                            <a href={attestation.documentURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Document</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}