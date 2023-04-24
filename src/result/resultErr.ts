import {Match, Result, ResultInterface, ResultSerialized} from "./result";
import {ResultOk} from "./resultOk";

export class ResultErr<E> implements ResultInterface<never, E> {
    private readonly error: E;

    constructor(error: E) {
        this.error = error;
    }

    public and<T, U>(res: Result<U, E>): ResultErr<E> {
        return this;
    }

    public andPreserved<U>(res: Result<U, E>): ResultErr<E> {
        return this;
    }

    public inspect(fn: (val: never) => void): ResultErr<E> {
        return this;
    }

    public isErr(): this is ResultErr<E> {
        return true;
    }

    public isOk<T>(): this is ResultOk<T> {
        return false;
    }

    public map<U>(fn: (val: never) => U): ResultErr<E> {
        return this;
    }

    public match<T, U, F>(fn: Match<T, E, U, F>): F {
        return fn.err(this.error);
    }

    public replaceOk(): ResultErr<E> {
        return this;
    }

    public replaceOkThen(): ResultErr<E> {
        return this;
    }

    public serialize(): ResultSerialized<never, E> {
        return {state: "err", value: this.error};
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
