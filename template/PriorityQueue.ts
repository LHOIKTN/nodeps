


class PriorityQueue<T> {
    private heap: Array<T>
    constructor(private priority: (a: T, b: T) => boolean
    ) {
        this.heap = [];
    }

    getLeftChildIndex(parentIndex: number) {
        return 2 * parentIndex + 1;
    }

    getRightChildIndex(parentIndex: number) {
        return 2 * parentIndex + 2;
    }

    getParentIndex(childIndex: number) {
        return Math.floor((childIndex - 1) / 2)
    }

    hasParent(childIndex: number) {
        return this.getParentIndex(childIndex) >= 0;
    }

    hasLeftChild(parentIndex: number) {
        return this.getLeftChildIndex(parentIndex) < this.heap.length;
    }

    hasRightChild(parentIndex: number) {
        return this.getRightChildIndex(parentIndex) < this.heap.length;
    }

    leftChild(parentIndex: number) {
        return this.heap[this.getLeftChildIndex(parentIndex)];
    }

    rightChild(parentIndex: number) {
        return this.heap[this.getRightChildIndex(parentIndex)];
    }

    parent(childIndex: number) {
        return this.heap[this.getParentIndex(childIndex)]
    }

    swap(indexA: number, indexB: number) {
        const tmp = this.heap[indexA]
        this.heap[indexA] = this.heap[indexB]
        this.heap[indexB] = tmp;
    }

    peek() {
        return this.heap.length == 0 ? null : this.heap[0];
    }

    isEmpty() {
        return !this.heap.length;
    }

    pop() {
        if (this.heap.length == 0) return null;
        if (this.heap.length == 1) return this.heap.pop();

        const item = this.heap[0];

        this.heap[0] = this.heap.pop()!;
        this.bubbleDown();
    }

    bubbleDown() {
        let currentIndex = 0;
        let nextIndex = null;

        while (this.hasLeftChild(currentIndex)) {
            if (this.hasRightChild(currentIndex) && this.priority(this.rightChild(currentIndex), this.leftChild(currentIndex))) {
                nextIndex = this.getRightChildIndex(currentIndex)
            }

        }
    }

}