## Description 
 I would implement the task with TypeScript, but I did it in JavaScript 
 because the starting file - index.js was a JavaScript file. 
 I am using [**readline**](https://nodejs.org/api/readline.html) because it 
 supports passing of custom input stream and has **line** event which is useful if we want to read
 a big file line by line. We shouldn't read big files synchronously. There can be 
 memory and performance issues. For making http requests I am using [**node-fetch**](https://www.npmjs.com/package/node-fetch).
 Unfortunately, I had to install version 2 because newer versions do not support require. node-fetch was converted to be an ESM 
 only package in version 3.0.0-beta.They recommended us to stay on v2 which is built with CommonJS. I decided to use this one, otherwise I would have wasted a lot more time. If necessary, I can think of a better solution.
 After calculation, we get exchange rates from cryptocompare only for the token types 
 which we need, and we do one request only. For csv parsing I would use library like [**csv-parse**](https://www.npmjs.com/package/csv-parse) but I believe
 this would be not good for such task.  Before you run the code you need to execute 
 ```
 npm install
 ```
 or 
 ```
 npm i 
 ```
 which is shorter. When you execute 
 ```
 npm start 
 ```
 or 
```
 npm run start
```
 The script will report the start of creating of portfolio process, 
 report the portfolio and create .csv file with the portfolio located
 at
```
.
└── data
    └── portfolionode.csv
```
The output will look like this: 

```

> 2b-boilerplate@1.0.0 prestart
> echo 'Creating portfolio ...'

Creating portfolio ...

> 2b-boilerplate@1.0.0 start
> node index.js

token,amount,portfolio_value_in_usd
BTC,199701.88,8335081156.39
ETH,150347.70,431370106.73
XRP,150277.29,139833.02


> 2b-boilerplate@1.0.0 poststart
> echo 'This is the resultant portfolio. Please check data/portfolionode.csv.'

This is the resultant portfolio. Please check data/portfolionode.csv.
```

 Just for fun I did Bash/AWK version too. As you can see AWK is superior when there is need to 
 be parsed tabular data. This version is not platform independent. It will work only in
 *NIX compatible system - Linux/Mac or under Linux terminal emulators like Gitbash.
 This version can be run with
```
npm run portfolio
```
 and will behave exactly in the same way like the clear nodejs version. It will report the start of creating of portfolio process,
 report the portfolio and create .csv file with the portfolio located
 at

```
.
└── data
    └── portfolio.csv
```
The output will look like this:
```

> 2b-boilerplate@1.0.0 preportfolio
> echo 'Creating portfolio ...'

Creating portfolio ...

> 2b-boilerplate@1.0.0 portfolio
> LC_NUMERIC="C" && awk -f portfolio-creator.awk data/transactions.csv > data/portfolio.csv && cat data/portfolio.csv

token,amount,portfolio_value_in_usd
BTC,39851.199,1663189394.299
ETH,30572.310,87682912.973
XRP,29560.413,27565.085

> 2b-boilerplate@1.0.0 postportfolio
> echo 'This is the resultant portfolio. Please check data/transactions.csv.'

This is the resultant portfolio. Please check data/portfolio.csv.

```

I have divided the logic into three functions in order to make the code shorter and easier to maintain. 
I recorded a little demo which you can watch [here](https://www.tiktok.com/@georgenaumov915/video/7013697248865324293).
It displays only how the task works. There is no visible code. If there is need I will remove it. 

### A note about repository 

Because I wanted to keep the current commits, but to not fork the repository I did the following:
1. Created a private repo with name 2b-boilerplate.
2. I did something like this:
```
git clone https://github.com/Propine/2b-boilerplate.git && cd 2b-boilerplate && git remote remove origin && git remote add origin https://github.com/gonaumov/2b-boilerplate.git
```
After that I just worked with this new origin.