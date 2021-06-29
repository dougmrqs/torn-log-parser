const fs = require("fs");

const logArr = fs.readFileSync("src/log.txt", "UTF-8").split("\n");

function getTransactionType(logLine) {
  const match = logLine.match(/withdrew|deposited/);
  if (match) {
    return match[0];
  }
}

function getTransactionValues(logLine) {
  const match = logLine.match(/\$(\d+,?){1,}/g);
  if (match) {
    return [toNumber(match[0]), toNumber(match[1])];
  }
}

function toNumber(moneyString) {
  return parseInt(moneyString.replace(/\$|,/g, ""));
}

function toString(moneyNumber) {
  return moneyNumber.toLocaleString();
}

const balance = logArr.reduce(
  (acc, line) => {
    const type = getTransactionType(line);
    if (!type) {
      return acc;
    }

    const values = getTransactionValues(line);

    if (type === "deposited") {
      acc.mine += values[0];
      acc.total -= values[1];
      return acc;
    }
    acc.total += values[1];
    acc.mine -= values[0];
    return acc;
  },
  {
    mine: 0,
    total: 0,
  }
);

console.log(toString(balance.mine));
console.log(toString(balance.total));
