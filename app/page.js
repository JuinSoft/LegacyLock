'use client'

import { useState, useEffect } from 'react';
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import MyAttestations from './my-attestations/page';
import RequestAttestation from './request-attestation/page';
import Attesters from './attesters/page';
import RegisterAttester from './register-attester/page';

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

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const [provider, setProvider] = useState(null);

    useEffect(() => {
        const init = async () => {
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
        setActiveTab('home');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'my-attestations':
                return <MyAttestations />;
            case 'request-attestation':
                return <RequestAttestation />;
            case 'attesters':
                return <Attesters />;
            case 'register-attester':
                return <RegisterAttester />;
            default:
                return <Home login={login} loggedIn={loggedIn} />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            {loggedIn && (
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} logout={logout} />
            )}
            <main className="flex-1 p-10">
                {renderContent()}
            </main>
        </div>
    );
}