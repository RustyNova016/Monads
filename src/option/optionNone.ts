import {None, Option} from "./option";
import {OptionSome} from "./optionSome";

export class OptionNone<T> implements Option<T> {
    public isNone(): boolean {
    public isNone(): this is OptionNone<T> {
        return true;
    }

    public isSome(): boolean {
    public isSome(): this is OptionSome<T> {
        return false;
    }

    public map<U>(fn: (someVal: T) => U): Option<U> {
        return None;
    }

    public or<U>(opt: Option<U>): Option<T | U> {
        return opt;
    }

    public orElse<U>(optFn: () => Option<U>): Option<T | U> {
        return optFn();
    }

    public unwrap(): T {
        throw new ReferenceError("Trying to unwrap None.");
    }

    public unwrapOr(defaultValue: T): T {
        return defaultValue;
    }

    public unwrapOrElse(fn: () => T): T {
        return fn();
    }

    public flatten(): Option<T> {
        return None
    }
}
