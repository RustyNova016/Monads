import {Result} from "./result";

export class ResultOk<T, E = never> implements Result<T, E> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    public isErr(): boolean {
        return false;
    }

    public isOk(): boolean {
        return true;
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
