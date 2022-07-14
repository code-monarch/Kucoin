const CryptoJS = require("crypto-js");
const axios = require("axios");

const endpoint = "https://api.kucoin.com/api/v1/accounts";
const key = "62c84ec85f44740001ea34b1";
const secret = "f2924067-2442-4489-8606-f0b324d487a5";
const passphrase = "taxwhaleapp";
const timestamp = Date.now().toString();
console.log("TIMESTAMP: ", timestamp);
const prehash_string = `${
  timestamp + "GET" + "/api/v1/accounts" + ""
}`;
const version = "2";

// Encrypt signature
const hash = CryptoJS.HmacSHA256(prehash_string, secret);
const signature = hash.toString(CryptoJS.enc.Base64);
console.log("SIGNATURE: ", signature);

// Encrypt passphrase
const passphraseHash = CryptoJS.HmacSHA256(passphrase, secret);
const encPassphrase = passphraseHash.toString(CryptoJS.enc.Base64);
console.log("PASSPHRASE: ", encPassphrase);

const headers = {
  "Content-Type": "application/json",
  "KC-API-TIMESTAMP": `${timestamp}`,
  "KC-API-SIGN": `${signature}`,
  "KC-API-KEY": `${key}`,
  "KC-API-PASSPHRASE": `${encPassphrase}`,
  "KC-API-KEY-VERSION": `${version}`,
};

axios
  .get(endpoint, {
    headers: headers,
  })
  .then((res) => {
    // console.log("RESPONSE STATUS: ", res.status);
    console.log("RESPONSE: ", res.data);
  })
  .catch((error) => {
    console.log("ERROR: ", error);
  });
