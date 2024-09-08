const { SignProtocolClient, SpMode, EvmChains } = require("@ethsign/sp-sdk");
const axios = require("axios");

const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.sepolia,
});

// function for making requests to the Sign Protocol Indexing Service
async function makeAttestationRequest(endpoint, options) {
    const url = `https://testnet-rpc.sign.global/api/${endpoint}`;
    const res = await axios.request({
        url,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        ...options,
    });
    // Throw API errors
    if (res.status !== 200) {
        throw new Error(JSON.stringify(res));
    }
    // Return original response
    return res.data;
}

export const schemaInfo = {
    name: "LegacyLock",
    id: "0x20d",
    fullSchemaId: "onchain_evm_11155111_0x20d",
    network: "sepolia",
    data: "sepolia",
    fields: [{ "name": "id", "type": "uint256" }, { "name": "requester", "type": "address" }, { "name": "attester", "type": "address" }, { "name": "name", "type": "string" }, { "name": "title", "type": "string" }, { "name": "description", "type": "string" }, { "name": "documentIPFSHash", "type": "string" }, { "name": "isVerified", "type": "bool" }, { "name": "timestamp", "type": "uint256" }],
    contractAddress: "0x878c92FD89d8E0B93Dc0a3c907A2adc7577e39c5" // Sepolia Testnet
}

export async function createAttestation(details, signer) {
    const res = await client.createAttestation({
        schemaId: schemaInfo.fullSchemaId,
        data: {
            details,
            signer
        },
        indexingValue: signer.toLowerCase()
    });
    return res;
}

export async function queryAttestations(attester, requester) {
    const response = await makeAttestationRequest("index/attestations", {
        method: "GET",
        params: {
            mode: "onchain",
            schemaId: schemaInfo.fullSchemaId,
            attester: attester,
            indexingValue: requester.toLowerCase(),
        },
    });

    // Make sure the request was successfully processed.
    if (!response.success) {
        return {
            success: false,
            message: response?.message ?? "Query failed.",
        };
    }

    // Return a message if no attestations are found.
    if (response.data?.total === 0) {
        return {
            success: false,
            message: "No attestation found.",
        };
    }

    // Return all attestations that match our query.
    return {
        success: true,
        attestations: response.data.rows,
    };
}