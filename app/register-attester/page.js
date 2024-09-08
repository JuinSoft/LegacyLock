'use client'

import { useState, useEffect } from 'react';
import ethRPC from '../utils/ethRPC';
import { ethers } from 'ethers';
import { contract } from '../utils/contract';

function RegisterAttesterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [organization, setOrganization] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchAddress = async () => {
            const addr = await ethRPC.getAccounts(window.ethereum);
            setAddress(addr);
        };
        fetchAddress();
    }, []);

    async function registerAttester(name, email, organization, role) {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contract.address, contract.abi, signer);
            await contractInstance.registerAttester(name, email, organization, role);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerAttester(name, email, organization, role);
        alert("Attester registered successfully!");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div>
                <label htmlFor="email" className="block mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded bg-gray-100"
                />
            </div>
            <div>
                <label htmlFor="address" className="block mb-2">Address</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    className="w-full p-2 border rounded bg-gray-100"
                    readOnly
                />
            </div>
            <div>
                <label htmlFor="organization" className="block mb-2">Organization</label>
                <input
                    type="text"
                    id="organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label htmlFor="role" className="block mb-2">Role</label>
                <input
                    type="text"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="verifiedAttester"
                    className="form-checkbox"
                    defaultChecked
                    disabled
                />
                <label htmlFor="verifiedAttester">Verified Attester</label>
                <span className="text-blue-500 cursor-pointer" onClick={() => alert("Can be verified by only legitimate parties like Government bodies or Private Institutions. For Demo its already verified!")}>ⓘ</span>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
        </form>
    );
}

export default function RegisterAttester() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Register as an Attester</h1>
            <RegisterAttesterForm />
        </div>
    );
}