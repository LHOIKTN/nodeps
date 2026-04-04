/**
 * DP
 * 비트마스킹
 *
 */

const N = +require("fs").readFileSync("./dev/stdin").toString();
const MOD = 1_000_000_000;
const dp = Array.from(new Array(N), () => Array.from(new Array(10), () => new Array(1024).fill(0)));

if (N < 10) {
    console.log(0);
    process.exit();
} else {
    for (let i = 1; i < 10; i++) {
        dp[0][i][1 << i] = 1;
    }

    for (let i = 1; i < N; i++) {
        for (let k = 0; k < 10; k++) {
            for (let b = 0; b < 1024; b++) {
                if (k >= 1) {
                    dp[i][k][b | (1 << k)] += dp[i - 1][k - 1][b];
                }

                if (k <= 8) {
                    dp[i][k][b | (1 << k)] += dp[i - 1][k + 1][b];
                }

                dp[i][k][b | (1 << k)] %= MOD;
            }
        }
    }
}

let ans = 0;
for (let i = 0; i < 10; i++) {
    ans += dp[N - 1][i][1023];
    ans %= MOD;
}

console.log(ans);
