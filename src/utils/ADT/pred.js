//@flow
import Pred from "crocks/Pred";
import isEmpty from "crocks/predicates/isEmpty";
import isNumber from "crocks/predicates/isNumber";
import hasProp from "crocks/predicates/hasProp";
import and from "crocks/logic/and";
import not from "crocks/logic/not";
import isString from "crocks/predicates/isString";
import equals from "crocks/pointfree/equals";
import flip from "crocks/combinators/flip";
import runWith from "crocks/pointfree/runWith";

import contramap from "crocks/pointfree/contramap";
import propOr from "crocks/helpers/propOr";

type property = string | number;

type predtype = (
  prop: property
) => {
  inspect: () => string,
  toString: () => string,
  runWith: (x: any) => boolean,
  type: any,
  valueOf: () => (x: any) => boolean,
  empty: () => any,
  concat: (m: any) => any,
  contramap: (fn: any) => any
};

//isNonEmpty :: a -> Boolean
const isNonEmpty: Boolean = and(not(isEmpty));

// isPropString :: Pred String
export const isPropString: predtype = Pred(isString);

//isPropStrictString :: Pred string
export const isPropStrictString: predtype = isPropString.concat(
  Pred(isNonEmpty)
);

//isPropsTrue :: Pred Boolean
export const isPropsTrue: predtype = Pred(equals(true));

// truthyVal :: String -> Pred Object
export const truthyObjVal = (val: property): predtype =>
  isPropsTrue.contramap(propOr(false, val));

// doesPropsHaveProp :: Pred {} | []
export const doesPropsHaveProp = (prop: property): predtype =>
  Pred(hasProp(prop));

export const composedhasProps = (prop: property): Boolean =>
  flip(runWith, doesPropsHaveProp(prop));

// isObjectPropValueTrue :: Pred {}
export const isObjectPropValueTrue = (prop: property): predtype =>
  doesPropsHaveProp(prop).concat(truthyObjVal(prop));
