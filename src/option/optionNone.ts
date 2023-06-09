import {None, Option, OptionInterface} from "./option";
import {OptionSome} from "./optionSome";
import {Err} from "../result/result";
import {ResultErr} from "../result/resultErr";

export class OptionNone implements OptionInterface<never> {
    public flatten(): OptionNone {
        return None;
    }

    public isNone(): this is OptionNone {
        return true;
    }

    public isNoneOr(): true {
        return true;
    }

    public isSome<T>(): this is OptionSome<T> {
        return false;
    }

    public isSomeAnd(): false {
        return false;
    }

    public map(): OptionNone {
        return None;
    }

    public okOr<E>(err: E): ResultErr<E> {
        return Err(err);
    }

    public or<T, U>(opt: Option<U>): Option<U> {
        return opt;
    }

    public orElse<T, U>(optFn: () => Option<U>): Option<U> {
        return optFn();
    }

    public unwrap(): never {
        throw new ReferenceError("Trying to unwrap None.");
    }

    public unwrapOr<T>(defaultValue: T): T {
        return defaultValue;
    }

    inspect(fn: (val: never) => void): Option<never> {
        return this;
    }

    public unwrapOrElse<T>(fn: () => T): T {
        return fn();
    }
}
