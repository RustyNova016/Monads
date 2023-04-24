import {ResultErrPrecise} from "../precise/resultErrPrecise";
import {ResultOkPrecise} from "../precise/resultOkPrecise";
import {Result, ResultInterface} from "./FuzzyResult";
import {Match} from "../result";

export class ResultErr<E> implements ResultInterface<never, E> {
    private readonly error: E;

    constructor(error: E) {
        this.error = error;
    }

    public and<T, U>(res: Result<U, E>): Result<U, E> {
        return this;
    }

    public andPreserved<T, U>(res: Result<U, E>): Result<T, E> {
        return this;
    }

    public inspect<T>(fn: (val: never) => void): Result<T, E> {
        return this;
    }

    public isErr(): this is ResultErr<E> {
        return true;
    }

    public isOk<T>(): this is ResultOkPrecise<T> {
        return false;
    }

    public map<U>(fn: (val: never) => U): Result<U, E> {
        return this;
    }

    public match<T, U, F>(fn: Match<T, E, U, F>): U | F {
        return fn.err(this.error);
    }

    public replaceOk<U>(): Result<U, E> {
        return this;
    }

    public replaceOkThen<U>(): Result<U, E> {
        return this;
    }

    /** Throw the error
     *
     * Alias of this.unwrap(). This provides a more meaningful way to throw Errors when the Err state is known
     */
    public throwErr<T>(): T | never {
        return this.unwrap();
    }

    public unwrap<T>(): never {
        throw this.error;
    }

    public unwrapErr(): E | never {
        return this.error;
    }

    public unwrapOr<T>(defaultValue: T): T {
        return defaultValue;
    }

    public unwrapOrElse<T>(fn: () => T): T {
        return fn();
    }
}
