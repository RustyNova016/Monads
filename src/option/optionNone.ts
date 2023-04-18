import {None, Option} from "./option";
import {OptionSome} from "./optionSome";

export class OptionNone<T> implements Option<T> {
    public flatten(): Option<T> {
        return None;
    }

    public isNone(): this is OptionNone<T> {
        return true;
    }

    public isNoneOr(): true {
        return true;
    }

    public isSome(): this is OptionSome<T> {
        return false;
    }

    public isSomeAnd(): false {
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
}
