

interface StackClass<T>
{
    push( value: T ): void;
    pop(): T | undefined;
    peek(): T | undefined;
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

    pop(): T | undefined
    {
        if ( this.stack.length === 0 ) return;

        return this.stack.pop();
    }

    peek(): T | undefined
    {
        if ( this.stack.length === 0 ) return;

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