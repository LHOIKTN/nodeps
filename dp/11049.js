// 11049

const [[N], ...input] = require('fs')
    .readFileSync('./dev/stdin')
    .toString()
    .trim()
    .split('\n')
    .map((v) => v.split(' ').map(Number));

//console.log(N)
//console.log(input)

const dp = Array.from(new Array(N), () => new Array(N).fill(0))

for (let i = 0; i < N - 1; i++) {
    dp[i][i + 1] = input[i][0] * input[i + 1][0] * input[i + 1][1]
}

for (let k = 2; k < N; k++) {
    for (let i = 0; i < N - k; i++) {
        const s = i
        const e = i + k
        let min = Infinity
        for (let j = s; j < e; j++) {
            min = Math.min(min, dp[s][j] + dp[j + 1][e] + input[s][0] * input[e][1] * input[j][1])
        }
        dp[s][e] = min
    }
}
//console.log(dp.map(v => v.join(' ')).join('\n'))
console.log(dp[0][N - 1])