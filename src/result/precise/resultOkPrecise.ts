import {Match, Ok} from "../result";
import {ResultErrPrecise} from "./resultErrPrecise";
import {ResultInterface} from "../fuzzy/FuzzyResult";

export class ResultOkPrecise<T> implements ResultInterface<T, never> {
    private readonly value: T;

    constructor(value: T) {
        this.value = value;
    }

    public and<E, U>(res: ResultInterface<U, E>): ResultInterface<U, E> {
        return res;
    }

    public andPreserved<E, U>(res: ResultInterface<U, E>): ResultInterface<T, E> {
        return res.and(this);
    }

    public inspect(fn: (val: T) => void): ResultOkPrecise<T> {
        fn(this.value);
        return this;
    }

    public isErr<E>(): this is ResultErrPrecise<E> {
        return false;
    }

    public isOk(): this is ResultOkPrecise<T> {
        return true;
    }

    public map<U>(fn: (val: T) => U): ResultOkPrecise<U> {
        return Ok(fn(this.value));
    }

    public match<E, U, F>(fn: Match<T, E, U, F>): U {
        return fn.ok(this.value);
    }

    public replaceOk<U>(val: U): ResultOkPrecise<U> {
        return Ok(val);
    }

    public replaceOkThen<U>(fn: (val: T) => U): ResultOkPrecise<U> {
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
