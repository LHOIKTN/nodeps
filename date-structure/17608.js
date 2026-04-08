//17608
// 쉬운 스택 문제
class Node {
    constructor(item) {
        this.item = item
        this.prev = null;
    }
}

class Stack {
    constructor() {
        this._top = null;
        this.size = 0;
    }

    push(item) {
        const node = new Node(item);
        node.prev = this._top;
        this._top = node;
        this.size += 1;
    }

    pop() {
        const topNode = this._top;
        this._top = this._top.prev;
        this.size -= 1;
        return topNode.item;
    }

    top() {
        return this._top == null ? null : this._top.item
    }
}

const [n, ...sticks] = require('fs')
    .readFileSync(0, 'utf-8')
    .toString()
    .trim()
    .split('\n')
    .map(Number);

const stack = new Stack()
stack.push(sticks[0])
for (let i = 1; i < n; i++) {
    while (stack.size > 0 && stack.top() <= sticks[i]) {
        stack.pop()
    }
    stack.push(sticks[i])
}

console.log(stack.size)