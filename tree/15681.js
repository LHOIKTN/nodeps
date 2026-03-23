const [[N, R, Q], ...input] = require('fs')
    .readFileSync('./dev/stdin')
    .toString()
    .trim()
    .split('\n')
    .map((v) => v.split(' ').map(Number));


const connect = Array.from(Array(N + 1), () => new Array())
for (let i = 0; i < N - 1; i++) {
    const [u, v] = input[i]
    connect[u].push(v)
    connect[v].push(u)
}

class Node {
    constructor() {
        this.p = null
        this.c = []
        this.size = 0
    }

    getSubTree() {
        if (this.size != 0) return this.size
        this.size = this.c.reduce((r, v) => {
            r += v.getSubTree()
            return r
        }, 1)

        return this.size
    }
}

const nodes = Array.from(Array(N + 1), () => new Node())

const make = [R]
while (make.length > 0) {
    const now = make.shift()
    for (const c of connect[now]) {
        if (c == nodes[now].p) continue;
        nodes[now].c.push(nodes[c])
        nodes[c].p = now
        make.push(c)
    }
}


for (const [q] of input.slice(-Q)) {
    console.log(nodes[q].getSubTree())
}