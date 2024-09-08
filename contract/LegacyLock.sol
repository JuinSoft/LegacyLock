// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LegacyLock {
    struct Attestation {
        uint256 id;
        address requester;
        address attester;
        string name;
        string title;
        string description;
        string documentIPFSHash;
        string documentURL;
        bool isVerified;
        uint256 timestamp;
    }

    struct Attester {
        address attesterAddress;
        string name;
        string email;
        string organization;
        string role;
        bool isVerified;
    }

    mapping(address => Attester) public attesters;
    mapping(uint256 => Attestation) public attestations;
    uint256 public attestationCount;

    event AttestationRequested(uint256 indexed id, address indexed requester, string title);
    event AttestationVerified(uint256 indexed id, address indexed attester);
    event AttesterRegistered(address indexed attester, string name);

    function registerAttester(string memory _name, string memory _email, string memory _organization, string memory _role) public {
        attesters[msg.sender] = Attester(msg.sender, _name, _email, _organization, _role, true);
        emit AttesterRegistered(msg.sender, _name);
    }

    function requestAttestation(string memory _name, string memory _title, string memory _description, string memory _documentIPFSHash, string memory _documentURL) public {
        uint256 id = attestationCount;
        attestations[id] = Attestation(id, msg.sender, address(0), _name, _title, _description, _documentIPFSHash, _documentURL, false, block.timestamp);
        attestationCount++;
        emit AttestationRequested(id, msg.sender, _title);
    }

    function verifyAttestation(uint256 _id) public {
        require(attesters[msg.sender].isVerified, "Only verified attesters can verify attestations");
        require(!attestations[_id].isVerified, "Attestation already verified");

        attestations[_id].attester = msg.sender;
        attestations[_id].isVerified = true;
        emit AttestationVerified(_id, msg.sender);
    }

    function getAttestation(uint256 _id) public view returns (Attestation memory) {
        return attestations[_id];
    }

    function getAttester(address _attester) public view returns (Attester memory) {
        return attesters[_attester];
    }

    function verifyAttester(address _attester) public {
        require(msg.sender == address(this), "Only the contract can verify attesters");
        attesters[_attester].isVerified = true;
    }

    function getMyRequestedAttestations() public view returns (Attestation[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < attestationCount; i++) {
            if (attestations[i].requester == msg.sender) {
                count++;
            }
        }

        Attestation[] memory myAttestations = new Attestation[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < attestationCount; i++) {
            if (attestations[i].requester == msg.sender) {
                myAttestations[index] = attestations[i];
                index++;
            }
        }

        return myAttestations;
    }

    function getMyAttestationsToVerify() public view returns (Attestation[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < attestationCount; i++) {
            if (attestations[i].attester == msg.sender && !attestations[i].isVerified) {
                count++;
            }
        }

        Attestation[] memory attestationsToVerify = new Attestation[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < attestationCount; i++) {
            if (attestations[i].attester == msg.sender && !attestations[i].isVerified) {
                attestationsToVerify[index] = attestations[i];
                index++;
            }
        }

        return attestationsToVerify;
    }
}