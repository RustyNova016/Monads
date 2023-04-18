import {Match, Result} from "./result";
import {ResultErr} from "./resultErr";

export class ResultOk<T, E = never> implements Result<T, E> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    public isErr(): this is ResultErr<T, E> {
        return false;
    }

    public isOk(): this is ResultOk<T, E> {
        return true;
    }

    public match<U, F>(fn: Match<T, E, U, F>): U | F {
        return fn.ok(this.value);
    }

    public unwrap(): T {
        return this.value;
    }

    public unwrapErr(): never {
        throw new Error("Error: Trying to unwrapErr on an Ok value");
    }

    public unwrapOr(): T {
        return this.value;
    }

    public unwrapOrElse(): T {
        return this.value;
    }
}
