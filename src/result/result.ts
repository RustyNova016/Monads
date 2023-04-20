import {ResultOk} from "./resultOk";
import {ResultErr} from "./resultErr";
import {Unwrapable} from "../unwrapable";

export interface Match<T, E, U, F> {
    err: (err: E) => F;
    ok: (val: T) => U;
}

/** The result type. Can be either a correct result (Ok) or an unexpected error (Err) */
export type Result<T, E> = ResultOk<T> | ResultErr<E>

/** Methods that Results must expand */
export interface ResultInterface<T, E> {
    /** Return res of the provided result if the result is Ok, otherwise returns any Err value*/
    and<U>(res: Result<U, E>): Result<U, E>;

    /** Return res if the result is Ok, otherwise returns any Err value*/
    andPreserved<U>(res: Result<U, E>): Result<T, E>;

    /** Call a function with the contained value (if Ok) */
    inspect(fn: (val: T) => void): Result<T, E>;

    /** Return true if the value is Err */
    isErr(): this is ResultErr<E>;

    /** Return true if the value is Ok */
    isOk(): this is ResultOk<T>;

    /** Maps a Result to another by applying a function to a contained Ok value, leaving an Err value untouched. */
    map<U>(fn: (val: T) => U): Result<U, E>;

    match<U, F>(fn: Match<T, E, U, F>): U | F;

    /** Replace the result value by another. If the result is an Err, then does nothing */
    replaceOk<U>(val: U): Result<U, E>;

    /** Replace the result value by another. If the result is an Err, then does nothing */
    replaceOkThen<U>(fn: (val: T) => U): Result<U, E>;

    /** Unwrap the value and throw on error */
    unwrap(): T | never;

    /** Returns the contained error. Throw on Ok */
    unwrapErr(): E | never;

    /** Returns the contained Ok value or a provided default. */
    unwrapOr(defaultValue: T): T;

    /** Returns the value or execute and return the value from the passed function */
    unwrapOrElse(fn: () => T): T;
}

export function Ok<T>(value: T): ResultOk<T> {
    return new ResultOk<T>(value);
}

export function Err<E>(value: E): ResultErr<E> {
    return new ResultErr<E>(value);
}
