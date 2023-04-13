import {Match, Result} from "./result";

export class ResultErr<T, E> implements Result<T, E> {
    private error: E;

    constructor(error: E) {
        this.error = error;
    }

    public isErr(): boolean {
        return true;
    }

    public isOk(): boolean {
        return false;
    }

    public match<U, F>(fn: Match<T, E, U, F>): F {
        return fn.err(this.error);
    }

    public unwrap(): never {
        throw this.error;
    }

    public unwrapOr(defaultValue: T): T {
        return defaultValue;
    }

    public unwrapOrElse(fn: () => T): T {
        return fn();
    }
}
