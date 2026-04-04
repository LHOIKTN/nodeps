const input = require('fs')
    .readFileSync('./dev/stdin')
    .toString()
    .trim()
    .split('\n')
    .map((v) => v.split(' ').map(Number));

const [N, K] = input.shift();

class Edge {
    constructor(src, dest, cost = 0) {
        this.src = src;
        this.dest = dest;
        this.cost = cost;
    }
}

class PriorityQueue {
    constructor(priority) {
        this.heap = [];
        this.pairIsInCorrectOrder = priority;
    }

    getLeftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }

    getRightChildIndex(parentIndex) {
        return 2 * parentIndex + 2;
    }

    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }

    hasParent(childIndex) {
        return this.getParentIndex(childIndex) >= 0;
    }

    hasLeftChild(parentIndex) {
        return this.getLeftChildIndex(parentIndex) < this.heap.length;
    }

    hasRightChild(parentIndex) {
        return this.getRightChildIndex(parentIndex) < this.heap.length;
    }

    leftChild(parentIndex) {
        return this.heap[this.getLeftChildIndex(parentIndex)];
    }

    rightChild(parentIndex) {
        return this.heap[this.getRightChildIndex(parentIndex)];
    }

    parent(childIndex) {
        return this.heap[this.getParentIndex(childIndex)];
    }

    swap(indexA, indexB) {
        const tmp = this.heap[indexA];
        this.heap[indexA] = this.heap[indexB];
        this.heap[indexB] = tmp;
    }

    peek() {
        return this.heap.length == 0 ? null : this.heap[0];
    }

    isEmpty() {
        return !this.heap.length;
    }

    pop() {
        if (this.heap.length == 0) {
            return null;
        }

        if (this.heap.length == 1) {
            return this.heap.pop();
        }

        const item = this.heap[0];

        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return item;
    }

    push(item) {
        this.heap.push(item);
        this.bubbleUp();
        return this;
    }

    bubbleUp() {
        let currentIndex = this.heap.length - 1;

        while (
            this.hasParent(currentIndex) &&
            !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heap[currentIndex])
        ) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    bubbleDown() {
        let currentIndex = 0;
        let nextIndex = null;

        while (this.hasLeftChild(currentIndex)) {
            if (
                this.hasRightChild(currentIndex) &&
                this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
            ) {
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }
            if (this.pairIsInCorrectOrder(this.heap[currentIndex], this.heap[nextIndex])) {
                break;
            }
            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }
}



class Kruskal {
    //input: [[src,dest,cost], ...]
    constructor(V, input) {
        this.mstCost = 0;
        this.mstNode = new Set();
        this.parent = Array(V + 1)
            .fill(0)
            .map((_, i) => i);


        this.edges = new PriorityQueue((a, b) => {
            return a.cost < b.cost
        });

        input.forEach(([s, d, c]) => {
            this.edges.push(new Edge(s, d, c));
        });

    }

    find(i) {
        if (this.parent[i] == i) {
            return i;
        }
        return this.find(this.parent[i]);
    }

    union(x, y) {
        if (x > y) this.parent[y] = x;
        else this.parent[x] = y;
    }

    getMst() {
        while (!this.edges.isEmpty()) {
            const { src, dest, cost } = this.edges.pop()
            const x = this.find(src);
            const y = this.find(dest);

            if (x != y) {
                this.union(x, y);
                this.mstCost += cost;
                this.mstNode.add(x);
                this.mstNode.add(y);
            }
        }
    }
}

const k = new Kruskal(N + 1, input);
k.getMst();
console.log(k.mstCost);
