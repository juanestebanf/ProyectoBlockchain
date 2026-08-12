require("dotenv").config();

const { ethers } = require("ethers");

async function verificar() {

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

    console.log("=================================");
    console.log("WALLET ADMINISTRATIVA");
    console.log("=================================");
    console.log("Dirección:", wallet.address);
    console.log(
        "Balance:",
        ethers.formatEther(balance),
        "SepoliaETH"
    );
    console.log(
        "Chain ID:",
        (await provider.getNetwork()).chainId.toString()
    );
    console.log("=================================");
}

verificar().catch(console.error);