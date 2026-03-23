

const [[n, m, r], t, ...edges] = require('fs')
    .readFileSync('./dev/stdin')
    .toString()
    .trim()
    .split('\n')
    .map((v) => v.split(' ').map(Number));

const cost = Array.from(Array(n), () => Array(n).fill(Infinity));

for (let i = 0; i < r; i++) {
    const [x, y, c] = edges[i];
    if (c > m) continue;
    cost[x - 1][y - 1] = c;
    cost[y - 1][x - 1] = c;
}

for (let i = 0; i < n; i++) {
    cost[i][i] = 0;
}

for (let i = 0; i < n; i++) {
    for (let a = 0; a < n; a++) {
        if (a == i) continue;
        for (let b = 0; b < n; b++) {
            if (b == a || b == i) continue;
            cost[a][b] = Math.min(cost[a][b], cost[a][i] + cost[i][b])
        }
    }
}
let ans = 0
for (let i = 0; i < n; i++) {
    let temp = 0;
    for (let j = 0; j < n; j++) {
        if (cost[i][j] <= m) {
            temp += t[j]
        }
    }
    ans = Math.max(ans, temp)
}
console.log(ans)