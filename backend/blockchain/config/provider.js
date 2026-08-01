require("dotenv").config();

const { ethers } = require("ethers");

const contrato = require("../abi/SmartRentABI.json");

const provider = new ethers.JsonRpcProvider(
    "http://127.0.0.1:7545"
);

const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    provider
);

const smartRent = new ethers.Contract(

    "0x0B8a851557044e1d8a50AC8D4246E475fdF540ec",

    contrato,

    wallet

);

module.exports = smartRent;