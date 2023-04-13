import {ResultOk} from "./resultOk";
import {ResultErr} from "./resultErr";

export interface Result<T, E> {
    /** Return true if the value is Err */
    isErr(): boolean;

    /** Return true if the value is Ok */
    isOk(): boolean;

    /** Unwrap the value and throw on error */
    unwrap(): T | never;

    /** Returns the contained Ok value or a provided default. */
    unwrapOr(defaultValue: T): T;

    /** Returns the value or execute and return the value from the passed function */
    unwrapOrElse(fn: () => T): T;
}

export function Ok<T>(value: T): ResultOk<T, never> {
    return new ResultOk<T, never>(value);
}

export function Err<T, E>(value: E): ResultErr<T, E> {
    return new ResultErr<T, E>(value);
}
