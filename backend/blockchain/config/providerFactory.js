require("dotenv").config();

const { ethers } = require("ethers");
const abi = require("../abi/SmartRentABI.json");

const provider = new ethers.JsonRpcProvider(
    "http://127.0.0.1:7545"
);

function obtenerContrato(privateKey) {

    const wallet = new ethers.Wallet(
        privateKey,
        provider
    );

    return new ethers.Contract(

        "0x0B8a851557044e1d8a50AC8D4246E475fdF540ec",

        abi,

        wallet

    );

}

module.exports = {

    obtenerContrato

};