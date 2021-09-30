const fetch = require("node-fetch");

const getFixing = async (inputData) => {
    const response = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${Array.from(inputData).join(",")}&tsyms=USD`);
    return  await response.json();
}

module.exports = getFixing