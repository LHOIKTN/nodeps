const [[C, N], ...input] = require("fs")
    .readFileSync("./dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((v) => v.split(" ").map(Number));

const dp = new Array(1101).fill(Infinity);
dp[0] = 0;
input.forEach((v) => {
    const [cost, man] = v;
    for (let i = man; i < 1101; i++) {
        dp[i] = Math.min(dp[i - man] + cost, dp[i]);
    }
});

console.log(Math.min(...dp.splice(C)));
