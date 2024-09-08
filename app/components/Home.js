export default function Home({ login, loggedIn }) {
    return (
        <>
            <h1 className="text-4xl font-bold mb-6">Welcome to LegacyLock</h1>
            <p className="text-xl mb-8">Secure and Attest your important documents with Sign Protocol.</p>

            {!loggedIn ? (
                <button onClick={login} className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
                    Connect Wallet
                </button>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Register as an Attester</h2>
                        <p className="mb-4">Join our network of trusted attesters and help verify important documents and claims.</p>
                        <button onClick={() => setActiveTab('register-attester')} className="bg-green-600 text-white px-4 py-2 rounded inline-block hover:bg-green-700 transition duration-300">Register Now</button>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Request Attestation</h2>
                        <p className="mb-4">Get your documents or claims verified by our network of trusted attesters.</p>
                        <button onClick={() => setActiveTab('request-attestation')} className="bg-green-600 text-white px-4 py-2 rounded inline-block hover:bg-green-700 transition duration-300">Request Now</button>
                    </div>
                </div>
            )}

            <section className="mt-16">
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">1. Connect</h3>
                        <p>Connect your wallet to get started with LegacyLock.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">2. Request</h3>
                        <p>Submit your documents for attestation by our trusted network.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">3. Verify</h3>
                        <p>Receive Sign Protocol backed verification for your important documents.</p>
                    </div>
                </div>
            </section>
        </>
    );
}