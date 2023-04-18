import {Match, Ok, Result} from "./result";
import {ResultErr} from "./resultErr";

export class ResultOk<T> implements Result<T, never> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    public and<E, U>(res: Result<U, E>): Result<U, E> {
        return res;
    }

    public andPreserved<E, U>(res: Result<U, E>): Result<T, E> {
        return res.and(this);
    }

    public isErr<E>(): this is ResultErr<E> {
        return false;
    }

    public isOk(): this is ResultOk<T> {
        return true;
    }

    public match<E, U, F>(fn: Match<T, E, U, F>): U {
        return fn.ok(this.value);
    }

    public replaceOk<U>(val: U): ResultOk<U> {
        return Ok(val);
    }

    public replaceOkThen<U>(fn: (val: T) => U): ResultOk<U> {
        return this.replaceOk(fn(this.value));
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
