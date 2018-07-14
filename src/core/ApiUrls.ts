const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchMoreDetailsUrl = (pokemonId: number) => {
  return BASE_URL + '/pokemon/' + pokemonId;
};
