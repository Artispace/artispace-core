//@flow

// crocks
import prop from "crocks/Maybe/prop";
import safe from "crocks/Maybe/safe";
import isString from "crocks/predicates/isString";
import chain from "crocks/pointfree/chain";
import compose from "crocks/helpers/compose";
import option from "crocks/pointfree/option";
import and from "crocks/logic/and";
import not from "crocks/logic/not";
import isEmpty from "crocks/predicates/isEmpty";
import isArray from "crocks/predicates/isArray";
import isObject from "crocks/predicates/isObject";
import isNumber from "crocks/predicates/isNumber";
import isBoolean from "crocks/predicates/isBoolean";
import { get } from "crocks/State";

// propOr :: (String, (b -> Boolean), a) -> Object -> c
const propOr = (key, pred, def) =>
  compose(
    option(def),
    chain(safe(pred)),
    prop(key)
  );

type property = string | number;

type gettype = (
  fn: any
) => {
  inspect: () => string,
  toString: () => string,
  runWith: (state: any, ...args: any[]) => any,
  execWith: (s: any) => any,
  evalWith: (s: any) => any,
  type: any,
  ap: (m: any) => any,
  of: (x: any) => any,
  map: (fn: any) => any,
  chain: (fn: any) => any
};
//isNonEmptyString :: a -> Boolean
const isNonEmptyString: Boolean = and(not(isEmpty), isString);

// safeStringProp :: (String, String) -> Object -> String
const safeStringProp = (n, def): string => propOr(n, isNonEmptyString, def);

// safeArrayProp :: (String, String) -> Object -> [any]
const safeArrayProp = (n, def): Array<any> => propOr(n, isArray, def);

// safeObjectProp :: (String, String) -> Object -> {a}
const safeObjectProp = (n, def): Object => propOr(n, isObject, def);

const safeNumberProp = (n, def): number => propOr(n, isNumber, def);

const safeBooleanProp = (n, def): Boolean => propOr(n, isBoolean, def);

//dynamicSafeStringGetter :: -> State.get :: (s -> a) -> State s a
export const dynamicSafeStringGetter = (
  prop: property,
  def: string | null
): gettype => get(safeStringProp(prop, def));

//dynamicSafeArrayGetter :: -> State.get :: (s -> a) -> State s a
export const dynamicSafeArrayGetter = (prop: property, def: any): gettype =>
  get(safeArrayProp(prop, def));

//dynamicSafeObjectGetter :: -> State.get :: (s -> a) -> State s a
export const dynamicSafeObjectGetter = (prop: property, def: any): gettype =>
  get(safeObjectProp(prop, def));

//dynamicSafeNumberGetter :: -> State.get :: (s -> a) -> State s a
export const dynamicSafeNumberGetter = (prop: property, def: any): gettype =>
  get(safeNumberProp(prop, def));

//dynamicSafeBooleanGetter :: -> State.get :: (s -> a) -> State s a
export const dynamicSafeBooleanGetter = (prop: property, def: any): gettype =>
  get(safeNumberProp(prop, def));
