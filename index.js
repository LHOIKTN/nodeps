// 11049

const [[N], ...input] = require('fs')
    .readFileSync('./dev/stdin')
    .toString()
    .trim()
    .split('\n')
    .map((v) => v.split(' ').map(Number));

console.log(N)
console.log(input)