'use client'

import { useState } from 'react';
import { ethers } from 'ethers';
import { contract } from '../utils/contract';
import sendFileToIPFS from '../utils/sendFileToIPFS';

function RequestAttestationForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [document, setDocument] = useState(null);
    const [attesterAddress, setAttesterAddress] = useState('');
    const [requesterAddress, setRequesterAddress] = useState('');
    const [name, setName] = useState('');

    async function requestAttestation(name, title, description, documentIPFSHash, documentURL, attesterAddress, isVerified) {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contract.address, contract.abi, signer);
            await contractInstance.requestAttestation(name, title, description, documentIPFSHash, documentURL, attesterAddress, false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const documentURL = await sendFileToIPFS(document);
        await requestAttestation(name, title, description, documentURL.hash, documentURL.url, attesterAddress, true);
        alert("Attestation requested successfully!");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block mb-2">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label htmlFor="name" className="block mb-2">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            {/* <div>
                <label htmlFor="requesterAddress" className="block mb-2">Your Address</label>
                <input
                    type="text"
                    id="requesterAddress"
                    value={requesterAddress}
                    onChange={(e) => setRequesterAddress(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div> */}
            <div>
                <label htmlFor="description" className="block mb-2">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="4"
                    required
                ></textarea>
            </div>
            <div>
                <label htmlFor="document" className="block mb-2">Document</label>
                <input
                    type="file"
                    id="document"
                    onChange={(e) => setDocument(e.target.files[0])}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label htmlFor="attesterAddress" className="block mb-2">Attester Address</label>
                <input
                    type="text"
                    id="attesterAddress"
                    value={attesterAddress}
                    onChange={(e) => setAttesterAddress(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Request</button>
        </form>
    );
}

export default function RequestAttestation() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Request Attestation</h1>
            <RequestAttestationForm />
        </div>
    );
}