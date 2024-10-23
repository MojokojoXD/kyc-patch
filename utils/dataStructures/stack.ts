

interface StackClass<T>
{
    stack: T[];
    push( value: T ): void;
    pop(): T | null;
    peek(): T | null;
    size(): number;
    clear(): void;
}



export class Stack<T> implements StackClass<T>
{
    private stack: T[];

    constructor() {
        this.stack = []
    }

    push( value: T ): void
    {
        this.stack.push( value );
    }

    pop(): T | null
    {
        if ( this.stack.length === 0 ) return null;

        return this.stack.pop();
    }

    peek(): T | null
    {
        if ( this.stack.length === 0 ) return null;

        return this.stack[ this.stack.length - 1 ];
    }

    size(): number
    {
        return this.stack.length;
    }

    clear(): void
    {
        this.stack = [];
    }
}