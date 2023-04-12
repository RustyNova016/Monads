import {None, Option} from "./option";

export class OptionNone<T> implements Option<T> {
    public isNone(): boolean {
        return true;
    }

    public isSome(): boolean {
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
