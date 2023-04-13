import {Match, Result} from "./result";

export class ResultOk<T, E = never> implements Result<T, E> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    public isErr(): boolean {
        return false;
    }

    public isOk(): boolean {
        return true;
    }

    public match<U, F>(fn: Match<T, E, U, F>): U | F {
        return fn.ok(this.value);
    }

    public unwrap(): T {
        return this.value;
    }

    public unwrapOr(): T {
        return this.value;
    }

    public unwrapOrElse(): T {
        return this.value;
    }
}
