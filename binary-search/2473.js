// 이분탐색, 투포인터
// 하나를 고정 시키고 나머지 두 용액에 대해 이분탐색

const [[N], input] = require('fs')
    .readFileSync('./dev/stdin')
    .toString()
    .trim()
    .split('\n')
    .map((v) => v.split(' ').map(Number));

input.sort((a, b) => a - b)

let aq = Infinity
let ans = []
for (let i = 0; i < N - 2; i++) {
    let j = i + 1
    let k = N - 1

    while (j < k) {
        const temp = input[i] + input[j] + input[k]
        const tmp_abs = Math.abs(temp)
        if (tmp_abs < aq) {
            aq = tmp_abs
            ans[0] = input[i]
            ans[1] = input[j]
            ans[2] = input[k]
        }

        if (temp > 0) {
            k -= 1
        } else if (temp < 0) {
            j += 1
        } else {
            console.log(input[i], input[j], input[k])
            process.exit()
        }

    }
}

console.log(ans[0], ans[1], ans[2])