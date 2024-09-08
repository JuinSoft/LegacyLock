import Link from 'next/link';

export default function Sidebar({ activeTab, setActiveTab, logout }) {
    return (
        <aside className="w-64 bg-gray-800 p-6">
            <nav className="space-y-2">
                <button onClick={() => setActiveTab('home')} className={`block w-full text-left py-2 px-4 text-gray-300 hover:bg-gray-700 rounded ${activeTab === 'home' ? 'bg-gray-700' : ''}`}>Home</button>
                <button onClick={() => setActiveTab('my-attestations')} className={`block w-full text-left py-2 px-4 text-gray-300 hover:bg-gray-700 rounded ${activeTab === 'my-attestations' ? 'bg-gray-700' : ''}`}>My Requests</button>
                <button onClick={() => setActiveTab('request-attestation')} className={`block w-full text-left py-2 px-4 text-gray-300 hover:bg-gray-700 rounded ${activeTab === 'request-attestation' ? 'bg-gray-700' : ''}`}> New Attestation</button>
                <button onClick={() => setActiveTab('attesters')} className={`block w-full text-left py-2 px-4 text-gray-300 hover:bg-gray-700 rounded ${activeTab === 'attesters' ? 'bg-gray-700' : ''}`}>Attestation Requested</button>
                <button onClick={() => setActiveTab('register-attester')} className={`block w-full text-left py-2 px-4 text-gray-300 hover:bg-gray-700 rounded ${activeTab === 'register-attester' ? 'bg-gray-700' : ''}`}>Register as Attester</button>
                <button onClick={logout} className="block w-full text-left py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">Logout</button>
            </nav>
        </aside>
    );
}