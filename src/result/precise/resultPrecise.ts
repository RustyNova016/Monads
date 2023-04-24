import {ResultErrPrecise} from "./resultErrPrecise";
import {ResultOkPrecise} from "./resultOkPrecise";

/** Represent a value that can be either a correct result (Ok) or an unexpected error (Err)
 *
 *  This result return precise return types that can be more verbose but more precise
 */
export type ResultPrecise<T, E> = ResultOkPrecise<T> | ResultErrPrecise<E>;
