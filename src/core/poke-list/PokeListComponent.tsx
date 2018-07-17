import * as React from 'react';

import { IPokemon } from '../Interfaces';
import PokeCardComponent from '../poke-card';

interface IProps {
  pokeList: IPokemon[];
}

interface IState {

}

class PokeListComponent extends React.Component <IProps, IState> {
  public render() {
    const { pokeList } = this.props;
    return pokeList
          .filter((pokemon) => {
            return !pokemon.hide;
          })
          .map((pokemon, index) => {
            return <PokeCardComponent pokemonData={pokemon} key={index}/>;
          });
  }
}

export default PokeListComponent;
