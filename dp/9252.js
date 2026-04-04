/**
 * LCS
 * https://velog.io/@emplam27/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B7%B8%EB%A6%BC%EC%9C%BC%EB%A1%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8A%94-LCS-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Longest-Common-Substring%EC%99%80-Longest-Common-Subsequence
 *
 */
const [A, B] = require("fs").readFileSync("./dev/stdin").toString().trim().split("\n");
const dp = Array.from(Array(A.length + 1), () => Array(B.length + 1).fill(0));
for (let i = 0; i < A.length + 1; i++) {
    if (i == 0) continue;
    for (let j = 0; j < B.length + 1; j++) {
        if (j == 0) continue;
        if (A[i - 1] == B[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
            dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
        }
    }
}

let res = "";
let x = A.length;
let y = B.length;
console.log(dp[x][y]);
while (dp[x][y] != 0) {
    if (dp[x][y] == dp[x - 1][y]) {
        x -= 1;
        continue;
    } else if (dp[x][y] == dp[x][y - 1]) {
        y -= 1;
        continue;
    } else {
        x -= 1;
        y -= 1;
        res = A[x] + res;
    }
}

console.log(res);
