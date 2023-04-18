import {Option, Some} from "./option";
import {OptionNone} from "./optionNone";

export class OptionSome<T> implements Option<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    public isNone(): boolean {
    public isNone(): this is OptionNone<T> {
        return false;
    }

    public isSome(): boolean {
    public isSome(): this is OptionSome<T>  {
        return true;
    }

    public map<U>(fn: (someVal: T) => U): Option<U> {
        return Some(fn(this.value));
    }

    public or<U>(): Option<T | U> {
        return this;
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

    public flatten(): Option<T> {
        if(this.value instanceof OptionSome){
            return this.value
        }
        return Some(this.value)
    }

    /** Return the value
     * Alias of unwrap() when it is known that this is OptionSome
     */
    public get() {
        return this.unwrap()
}
