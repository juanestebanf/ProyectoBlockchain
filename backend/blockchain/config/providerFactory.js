require("dotenv").config();

const { ethers } = require("ethers");
const abi = require("../abi/SmartRentABI.json");

const provider = new ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL
);

function obtenerContrato(privateKey) {

    const wallet = new ethers.Wallet(
        privateKey,
        provider
    );

    return new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        abi,
        wallet
    );
}

module.exports = {
    obtenerContrato
};