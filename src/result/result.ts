import {ResultOkPrecise} from "./precise/resultOkPrecise";
import {ResultErrPrecise} from "./precise/resultErrPrecise";
import {Result} from "./fuzzy/FuzzyResult";

export interface Match<T, E, U, F> {
    err: (err: E) => F;
    ok: (val: T) => U;
}

export function Ok<T>(value: T): ResultOkPrecise<T> {
    return new ResultOkPrecise<T>(value);
}

export function Err<E>(value: E): ResultErrPrecise<E> {
    return new ResultErrPrecise<E>(value);
}

function thing(stuff: Result<string, Error>) {
    if(stuff.isErr()) {
        stuff.unwrap()
    } else {
        stuff.unwrap()
    }
}
