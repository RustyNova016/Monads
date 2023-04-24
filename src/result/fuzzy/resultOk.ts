import {Match} from "../result";
import {fuzzyOk, Result, ResultInterface} from "./FuzzyResult";
import {ResultOkPrecise} from "../precise/resultOkPrecise";
import {ResultErrPrecise} from "../precise/resultErrPrecise";
import {ResultErr} from "./resultErr";

export class ResultOk<T> implements ResultInterface<T, never> {
    private readonly value: T;

    constructor(value: T) {
        this.value = value;
    }

    public and<E, U>(res: Result<U, E>): Result<U, E> {
        return res;
    }

    public andPreserved<E, U>(res: Result<U, E>): Result<T, E> {
        return res.and(this);
    }

    public inspect<E>(fn: (val: T) => void): Result<T, E> {
        fn(this.value);
        return this;
    }

    public isErr<E>(): this is ResultErr<E> {
        return false;
    }

    public isOk(): this is ResultOkPrecise<T> {
        return true;
    }

    public map<U, E>(fn: (val: T) => U): Result<U, E> {
        return fuzzyOk(fn(this.value));
    }

    public match<E, U, F>(fn: Match<T, E, U, F>): U {
        return fn.ok(this.value);
    }

    public replaceOk<U, E>(val: U): Result<U, E> {
        return fuzzyOk(val);
    }

    public replaceOkThen<U, E>(fn: (val: T) => U): Result<U, E> {
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
