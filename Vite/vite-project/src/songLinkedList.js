class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class songLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
        } else {
            this.tail.next = newNode;
        }

        this.tail = newNode;
        this.length++;
    }

    peek(value, current = this.head) {
        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    size() {
        return this.length;
    }

    isEmpty() {
        return this.length === 0;
    }

    remove(value) {
        if (!this.head) return null;

        if (this.head.value === value) {
            this.head = this.head.next;

            if (!this.head) {
                this.tail = null;
            }

            this.length--;
            return;
        }

        let current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }

        if (current.next) {
            current.next = current.next.next;
            if (!current.next) this.tail = current;
            this.length--;
        }
    }

    print() {
        let current = this.head;
        let result = "";
        while (current) {
            result += current.value + " -> ";
            current = current.next;
        }
        console.log(result + "null");
    }
}

export { songLinkedList };