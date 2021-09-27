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
      return acc;
    }
    acc.mine -= values[0];
    return acc;
  },
  {
    mine: 0,
  }
);
