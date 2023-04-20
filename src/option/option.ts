import {OptionSome} from "./optionSome";
import {OptionNone} from "./optionNone";
import {Unwrapable} from "../unwrapable";

export type Option<T> = OptionSome<T> | OptionNone

/** Represent an optional value */
export interface OptionInterface<T> {
    /** Converts from Option<Option<T>> to Option<T>. */
    flatten(): Option<T>;

    /** Returns true if the option is a None value.*/
    isNone(): this is OptionNone;

    /** Return true if the value is None, or match a predicate */
    isNoneOr(fn: (val: T) => boolean): boolean;

    /** Returns true if the option is a Some value. */
    isSome(): this is OptionSome<T>;

    /** Return true if the value is Some and match a predicate */
    isSomeAnd(fn: (val: T) => boolean): boolean;

    /** Apply a transformation function to the value if it isn't None */
    map<U>(fn: (someVal: T) => U): Option<U>;

    /** Returns the option if it contains a value, otherwise returns opt
     *
     * Arguments passed to or are eagerly evaluated; if you're passing the result of a function call,
     * it is recommended to use orElse, which is lazily evaluated.
     * */
    or<U>(opt: Option<U>): Option<T | U>;

    /** Returns the option if it contains a value, otherwise calls optFn and returns the result. */
    orElse<U>(optFn: () => Option<U>): Option<T | U>;

    /** Unwrap the value, if it's None, then throw */
    unwrap(): T | never;

    /** Returns the contained Some value or a provided default. */
    unwrapOr(defaultValue: T): T;

    /** Returns the value or get the value from the passed function */
    unwrapOrElse(fn: () => T): T;
}

/** Return an Option value. */
export function Some<T>(value: T | undefined): Option<T> {
    return typeof value !== "undefined" ?
        new OptionSome(value) :
        new OptionNone();
}

/** Return a Optional value as None */
export const None = new OptionNone();
