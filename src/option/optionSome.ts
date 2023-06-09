import {Option, OptionInterface, Some} from "./option";
import {OptionNone} from "./optionNone";
import {Ok} from "../result/result";
import {ResultOk} from "../result/resultOk";

export class OptionSome<T> implements OptionInterface<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    public flatten(): Option<T> {
        if (this.value instanceof OptionSome) {
            return this.value;
        }
        return Some(this.value);
    }

    /** Return the value
     * Alias of unwrap() when it is known that this is OptionSome
     */
    public get(): T {
        return this.unwrap();
    }

    public isNone(): this is OptionNone {
        return false;
    }

    public isNoneOr(fn: (val: T) => boolean): boolean {
        return fn(this.value);
    }

    public isSome(): this is OptionSome<T> {
        return true;
    }

    public isSomeAnd(fn: (val: T) => boolean): boolean {
        return fn(this.value);
    }

    public map<U>(fn: (someVal: T) => U): Option<U> {
        return Some(fn(this.value));
    }

    public okOr(): ResultOk<T> {
        return Ok(this.value);
    }

    public or<U>(): Option<T | U> {
        return this;
    }

    public inspect(fn: (val: T) => void): Option<T> {
        fn(this.value);
        return this
    }

    public orElse<U>(): Option<T | U> {
        return this;
    }

    public unwrap(): T {
        return this.value;
    }

    public unwrapOr(): T {
        return this.value;
    }

    public unwrapOrElse(): T {
        return this.value;
    }
}
