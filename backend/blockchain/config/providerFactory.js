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

        "0xfB81973d7F1CaE7B757cEfE0817d567bD4926284",

        abi,

        wallet

    );

}

module.exports = {

    obtenerContrato

};