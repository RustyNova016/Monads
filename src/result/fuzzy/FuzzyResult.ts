import {ResultErrPrecise} from "../precise/resultErrPrecise";
import {ResultOkPrecise} from "../precise/resultOkPrecise";
import {ResultOk} from "./resultOk";
import {ResultErr} from "./resultErr";
import {Match} from "../result";

/** Represent a value that can be either a correct result (Ok) or an unexpected error (Err)
 *
 *  This result is more vague in its return types, but prevent the verbosity of Typescript's union types.
 *
 *  It condenses a ResultOk<T> | ResultErr<E> into a simpler Result<T, E>.
 *  But once .isOk() or .isErr() is called, the methods keeps returning Result<T, E> instead of Result(Ok|Err)<(T|E)>.
 *
 *  Call .precise() to get a more verbose, but correct value
 */
export type Result<T, E> = ResultOk<T> | ResultErr<E>

export interface ResultInterface<T, E> {
    /** Return res of the provided result if the result is Ok, otherwise returns any Err value*/
    and<U>(res: ResultInterface<U, E>): ResultInterface<U, E>;

    /** Return res if the result is Ok, otherwise returns any Err value*/
    andPreserved<U>(res: ResultInterface<U, E>): ResultInterface<T, E>;

    /** Call a function with the contained value (if Ok) */
    inspect(fn: (val: T) => void): ResultInterface<T, E>;

    /** Return true if the value is Err */
    isErr(): this is ResultErrPrecise<E>;

    /** Return true if the value is Ok */
    isOk(): this is ResultOkPrecise<T>;

    /** Maps a Result to another by applying a function to a contained Ok value, leaving an Err value untouched. */
    map<U>(fn: (val: T) => U): ResultInterface<U, E>;

    match<U, F>(fn: Match<T, E, U, F>): U | F;

    /** Replace the result value by another. If the result is an Err, then does nothing */
    replaceOk<U>(val: U): ResultInterface<U, E>;

    /** Replace the result value by another. If the result is an Err, then does nothing */
    replaceOkThen<U>(fn: (val: T) => U): ResultInterface<U, E>;

    /** Unwrap the value and throw on error */
    unwrap(): T | never;

    /** Returns the contained error. Throw on Ok */
    unwrapErr(): E | never;

    /** Returns the contained Ok value or a provided default. */
    unwrapOr(defaultValue: T): T;

    /** Returns the value or execute and return the value from the passed function */
    unwrapOrElse(fn: () => T): T;
}


export function fuzzyOk<T>(val: T): ResultOk<T> {
    return new ResultOk(val)
}

export function fuzzyErr<E>(val: E): ResultErr<E> {
    return new ResultErr(val)
}
