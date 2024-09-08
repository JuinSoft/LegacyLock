/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";

const getChainId = async (provider) => {
  try {
    const ethersProvider = new ethers.BrowserProvider(provider);
    // Get the connected Chain's ID
    const networkDetails = await ethersProvider.getNetwork();
    return networkDetails.chainId.toString();
  } catch (error) {
    return error;
  }
}

const getAccounts = async (provider) => {
  try {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = await signer.getAddress();

    return address;
  } catch (error) {
    return error;
  }
}

const getBalance = async (provider) => {
  try {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = await signer.getAddress();

    // Get user's balance in ether
    const balance = ethers.formatEther(
      await ethersProvider.getBalance(address) // Balance is in wei
    );

    return balance;
  } catch (error) {
    return error;
  }
}

const sendTransaction = async (provider, destination, eth) => {
  try {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();

    const amount = ethers.parseEther(eth);

    // Submit transaction to the blockchain
    const tx = await signer.sendTransaction({
      to: destination,
      value: amount,
      maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
      maxFeePerGas: "6000000000000", // Max fee per gas
    });

    // Wait for transaction to be mined
    const receipt = await tx.wait();

    return receipt;
  } catch (error) {
    return error;
  }
}

const signMessage = async (provider, message) => {
  try {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();

    // Sign the message
    const signedMessage = await signer.signMessage(message);

    return signedMessage;
  } catch (error) {
    return error;
  }
}

export default {getChainId, getAccounts, getBalance, sendTransaction, signMessage};
