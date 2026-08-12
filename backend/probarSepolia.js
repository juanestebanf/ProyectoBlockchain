require("dotenv").config();

const { ethers } = require("ethers");

async function probar() {
    try {
        const provider = new ethers.JsonRpcProvider(
            process.env.SEPOLIA_RPC_URL
        );

        const wallet = new ethers.Wallet(
            process.env.PRIVATE_KEY,
            provider
        );

        const balance = await provider.getBalance(
            wallet.address
        );

        const network = await provider.getNetwork();

        console.log("Red:", network.name);
        console.log("Chain ID:", network.chainId.toString());
        console.log("Wallet:", wallet.address);
        console.log(
            "Balance:",
            ethers.formatEther(balance),
            "ETH"
        );

        const code = await provider.getCode(
            process.env.CONTRACT_ADDRESS
        );

        console.log(
            "Contrato encontrado:",
            code !== "0x"
        );

    } catch (error) {
        console.error("ERROR:", error);
    }
}

probar();