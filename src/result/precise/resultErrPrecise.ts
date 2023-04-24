import {Match} from "../result";
import {ResultOkPrecise} from "./resultOkPrecise";
import {Result, ResultInterface} from "../fuzzy/FuzzyResult";

export class ResultErrPrecise<E> implements ResultInterface<never, E> {
    private readonly error: E;

    constructor(error: E) {
        this.error = error;
    }

    public and<T, U>(res: Result<U, E>): ResultErrPrecise<E> {
        return this;
    }

    public andPreserved<U>(res: Result<U, E>): ResultErrPrecise<E> {
        return this;
    }

    public inspect(fn: (val: never) => void): ResultErrPrecise<E> {
        return this;
    }

    public isErr(): this is ResultErrPrecise<E> {
        return true;
    }

    public isOk<T>(): this is ResultOkPrecise<T> {
        return false;
    }

    public map<U>(fn: (val: never) => U): ResultErrPrecise<E> {
        return this;
    }

    public match<T, U, F>(fn: Match<T, E, U, F>): F {
        return fn.err(this.error);
    }

    public replaceOk(): ResultErrPrecise<E> {
        return this;
    }

    public replaceOkThen(): ResultErrPrecise<E> {
        return this;
    }

    /** Throw the error
     *
     * Alias of this.unwrap(). This provides a more meaningful way to throw Errors when the Err state is known
     */
    public throwErr(): never {
        this.unwrap();
    }

    public unwrap(): never {
        throw this.error;
    }

    public unwrapErr(): E {
        return this.error;
    }

    public unwrapOr<T>(defaultValue: T): T {
        return defaultValue;
    }

    public unwrapOrElse<T>(fn: () => T): T {
        return fn();
    }
}
