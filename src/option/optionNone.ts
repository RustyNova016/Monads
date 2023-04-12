import {Option} from "./option";

export class OptionNone<T> implements Option<T> {
    public isNone(): boolean {
        return true;
    }

    public isSome(): boolean {
        return false;
    }

    public or<U>(opt: Option<U>): Option<T | U> {
        return opt;
    }

    public orElse<U>(optFn: () => Option<U>): Option<T | U> {
        return optFn();
    }

    public unwrap(): T {
        throw new ReferenceError('Trying to unwrap None.');
    }

    public unwrapOr(defaultValue: T): T {
        return defaultValue;
    }
}
