export interface IPokeListState {

}

export interface IPokeListProps {
  pokemonList: IPokemon[];
}

export interface IPokeCardProps {
  pokemonData: IPokemon;
}

export interface IPokemonResearchData {

}

export interface IPokemon {
  id: number;
  url: string;
  name: string;
  researchData?: IPokemonResearchData;
}
