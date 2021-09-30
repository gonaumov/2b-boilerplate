const fs = require('fs');
const fsPromises = require('fs/promises');
const readline = require('readline');
const calculateAmount = require('./src/calculate-amount');
const getFixing = require('./src/get-fixing');
const handleLine = require('./src/handle-line');
const results = new Map();

readline.createInterface({
    input: fs.createReadStream('data/transactions.csv').on('end', async () => {
        const json = await getFixing(results.keys());
        let out = "token,amount,portfolio_value_in_usd\n";
        for (const [key, value] of results.entries()) {
            out += `${key},${value.amount.toFixed(2)},${calculateAmount(json, key, 'USD', value.amount)}\n`;
        }
        console.log(out);
        await fsPromises.writeFile('data/portfolionode.csv', out);
    }),
    output: process.stdout,
    terminal: false
}).on('line', function (line) {
    const [_, action, token, amount] = line.split(/\s*,\s*/);
    handleLine(action, token, amount, results);
});