import {Match, Result} from "./result";
import {ResultOk} from "./resultOk";

export class ResultErr<T, E> implements Result<T, E> {
    private error: E;

    constructor(error: E) {
        this.error = error;
    }

    public isErr(): this is ResultErr<T, E> {
        return true;
    }

    public isOk(): this is ResultOk<T, E> {
        return false;
    }

    public match<U, F>(fn: Match<T, E, U, F>): F {
        return fn.err(this.error);
    }

    public unwrap(): never {
        throw this.error;
    }

    public unwrapErr(): E {
        return this.error;
    }

    public unwrapOr(defaultValue: T): T {
        return defaultValue;
    }

    public unwrapOrElse(fn: () => T): T {
        return fn();
    }

    /** Throw the error
     *
     * Alias of this.unwrap(). This provides a more meaningful way to throw Errors when the Err state is known
     */
    public throwErr(): never {
        this.unwrap()
    }
}
