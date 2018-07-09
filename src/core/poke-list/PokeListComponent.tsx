import * as React from 'react';
import PokeCardComponent from '../poke-card';

import { IPokeListProps, IPokeListState } from '../Interfaces';

export default class PokeListComponent extends React.Component <IPokeListProps, IPokeListState> {
  public render() {
    const { pokemonList } = this.props;
    return pokemonList.map((pokemon, index) => {
      return <PokeCardComponent pokemonData={pokemon} key={index}/>;
    });
  }
}
