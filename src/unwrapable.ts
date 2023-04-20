export interface Unwrapable<T> {
    unwrap(): T | never;

    unwrapOr(defaultValue: T): T;

    unwrapOrElse(fn: () => T): T;
}
