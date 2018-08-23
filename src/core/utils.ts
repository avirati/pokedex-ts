import { compose } from 'redux';

/* tslint:disable */
declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}
/* tslint:enable */

export const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const extractPokemonIdFromUrl = (url: string): number => {
  const idMatch = url.match(/\/\d+/);
  const id = (idMatch && idMatch[0].substring(1)) || '-1';
  return +id;
};

export const replaceAtPosition = <T>(sourceArr: T[], objToReplace: T, replaceIndex: number): T[] => ([
  ...sourceArr.slice(0, replaceIndex),
  objToReplace,
  ...sourceArr.slice(replaceIndex + 1)]);
