import * as React from 'react';
import PokeCardComponent from '../poke-card';

import { IPokemon } from '../Interfaces';

interface IProps {
  pokeList: IPokemon[];
}

interface IState {

}

class PokeListComponent extends React.Component <IProps, IState> {
  public render() {
    const { pokeList } = this.props;
    return pokeList.map((pokemon, index) => {
      return <PokeCardComponent pokemonData={pokemon} key={index}/>;
    });
  }
}

export default PokeListComponent;
