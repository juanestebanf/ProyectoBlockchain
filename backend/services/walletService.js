const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL
);

const walletAdministrativa = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    provider
);

const MONTO_INICIAL_USUARIO = "0.02";

const generarWalletUsuario = () => {
    return ethers.Wallet.createRandom();
};

const financiarWallet = async (direccion) => {

    const cantidad = ethers.parseEther(MONTO_INICIAL_USUARIO);

    const tx = await walletAdministrativa.sendTransaction({
        to: direccion,
        value: cantidad
    });

    console.log(
        ` Financiamiento enviado a ${direccion}`
    );

    console.log(
        `TX: ${tx.hash}`
    );

    await tx.wait();

    return tx.hash;
};

module.exports = {
    generarWalletUsuario,
    financiarWallet
};