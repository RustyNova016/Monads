import {OptionSome} from "./optionSome";
import {OptionNone} from "./optionNone";

export interface Option<T> {
    /** Returns true if the option is a None value.*/
    isNone(): boolean;

    /** Returns true if the option is a Some value. */
    isSome(): boolean;

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
}

export function Some<T>(value: T | undefined): Option<T> {
    return typeof value !== 'undefined' ?
        new OptionSome(value) :
        new OptionNone()
}

export const None = new OptionNone()
