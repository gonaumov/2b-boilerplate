const calculateAmount = (jsonData, token, currency, amount) => {
    const fixing = jsonData[token][currency];
    return (fixing * amount).toFixed(2);
}

module.exports = calculateAmount