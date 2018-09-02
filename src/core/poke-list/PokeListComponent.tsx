import * as React from 'react';
import { IPokemon } from '../duck/Interfaces';
import PokeCardComponent from '../poke-card';

interface IProps {
  pokeList: IPokemon[];
  favoriteToggleSwitch?: boolean;
}

class PokeListComponent extends React.Component <IProps> {
  public render() {
    const { pokeList } = this.props;
    return pokeList
          .filter((pokemon) => {
            if (this.props.favoriteToggleSwitch) {
              return !pokemon.hide && pokemon.favorite;
            } else {
              return !pokemon.hide;
            }
          })
          .map((pokemon, index) => {
            return <PokeCardComponent pokemonData={pokemon} key={index}/>;
          });
  }
}

export default PokeListComponent;
