import {Option} from "./option";

export class OptionSome<T> implements Option<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    public isNone(): boolean {
        return false;
    }

    public isSome(): boolean {
        return true;
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
}
