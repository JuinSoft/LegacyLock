# LegacyLock

LegacyLock is a decentralized application (dApp) that allows users to secure and verify important documents using blockchain technology. This project leverages Web3Auth for authentication and Ethereum for blockchain interactions.

## Features

- **Connect Wallet**: Users can connect their Ethereum wallet to interact with the dApp.
- **Request Attestation**: Users can request attestations for their documents.
- **Register as an Attester**: Users can register to become attesters and help verify documents.
- **View Attestations**: Users can view their attestations.
- **Blockchain Integration**: All interactions are secured and verified on the Ethereum blockchain.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- An Ethereum wallet (e.g., MetaMask)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/legacylock.git
   cd legacylock
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```sh
   NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=your_web3auth_client_id
   NEXT_APP_PINATA_API_KEY=your_pinata_api_key
   NEXT_APP_PINATA_API_SECRET=your_pinata_api_secret
   NEXT_APP_PINATA_GATEWAY=your_pinata_gateway
   ```

### Running the Application

1. Start the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `app/`: Contains the main application components and pages.
- `app/utils/`: Utility functions for interacting with IPFS and Ethereum.
- `public/`: Public assets.
- `styles/`: Global styles.
- `tailwind.config.js`: Tailwind CSS configuration.
- `next.config.mjs`: Next.js configuration.
- `package.json`: Project dependencies and scripts.

## Key Files

- `app/page.js`: Main landing page of the application.

  ```javascript:LegacyLock/app/page.js
  startLine: 1
  endLine: 113
  ```

- `app/my-attestations.js`: Page for viewing user attestations.

  ```javascript:LegacyLock/app/my-attestations.js
  startLine: 1
  endLine: 8
  ```

- `app/request-attestation.js`: Page for requesting document attestations.

  ```javascript:LegacyLock/app/request-attestation.js
  startLine: 1
  endLine: 10
  ```

- `app/utils/sendFileToIPFS.js`: Utility function for uploading files to IPFS using Pinata.

  ```javascript:LegacyLock/app/utils/sendFileToIPFS.js
  startLine: 1
  endLine: 29
  ```

- `app/utils/ethRPC.js`: Utility functions for interacting with the Ethereum blockchain.
  ```javascript:LegacyLock/app/utils/ethRPC.js
  startLine: 1
  endLine: 86
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
