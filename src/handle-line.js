const handleLine = (action, token, amount, results) => {
    /**
     * We need somehow to skip csv header.
     * Of course I can use some kind of
     * csv parser package like this:
     * https://www.npmjs.com/package/csv-parse
     * but I believe
     * this would be not good for such task.
     */
    if (/[A-Z]{3}/.test(token) === false) {
        return;
    }
    if (results.has(token)) {
        if(['DEPOSIT', 'WITHDRAWAL'].includes(action) === false) {
            throw new Error('Incorrect transaction type!');
        }
        const newAmount =  results.get(token).action === 'DEPOSIT' ? results.get(token).amount + parseFloat(amount) : results.get(token).amount - parseFloat(amount);
        const newObject = {
            ...results.get(token),
            amount: newAmount
        }
        results.set(token, newObject);
    } else {
        results.set(token, {
            action,
            token,
            amount: parseFloat(amount)
        })
    }
}

module.exports = handleLine