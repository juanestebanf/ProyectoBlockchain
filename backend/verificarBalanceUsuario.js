// Desde backend, crea temporalmente: verificarBalanceUsuario.js
require("dotenv").config();
const { ethers } = require("ethers");

async function verificar() {
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    
    // Dirección del usuario que se registró
    const direccionUsuario = "0x5c3d39fc2a846Ef3fe44a210c3E003e092ccF567";
    
    const balance = await provider.getBalance(direccionUsuario);
    console.log("=================================");
    console.log("BALANCE DEL USUARIO");
    console.log("=================================");
    console.log("Dirección:", direccionUsuario);
    console.log("Balance:", ethers.formatEther(balance), "SepoliaETH");
    console.log("=================================");
}

verificar().catch(console.error);