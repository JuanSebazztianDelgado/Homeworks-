class Node {
    constructor (value) {
        this.value = value;
        this.next = null; 
        this.prev = null;
    }
}

class songDoubleLinkedList {
    constructor () {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append (value) {
        const newNode = new Node (value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return;
        }

        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;

        this.length++;
    }

    size() {
        return this.length;
    }

    remove(value) {
        if (!this.head) return null;
    
        let current = this.head;
    
        while (current) {
            if (current.value === value) {
    
                if (current === this.head) {
                    this.head = current.next;
                    if (this.head) this.head.prev = null;
                }
    
                if (current === this.tail) {
                    this.tail = current.prev;
                    if (this.tail) this.tail.next = null;
                }
    
                if (current.prev) current.prev.next = current.next;
                if (current.next) current.next.prev = current.prev;
    
                this.length--; 
                return current;
            }
    
            current = current.next; 
        }
    
        return null;
    }

    print() {
        const values = [];
        let current = this.head;
    
        while (current) {
            values.push(current.value);
            current = current.next;
        }
    
        return values;
    }
}

export {songDoubleLinkedList};