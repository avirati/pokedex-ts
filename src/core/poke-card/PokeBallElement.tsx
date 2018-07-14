import * as React from 'react';
import { IPokemon } from '../Interfaces';

interface IProps {
  onFetchMoreDetails: (pokemonId: number) => void;
  pokemonData: IPokemon;
}

export default class PokeBallElement extends React.Component<IProps> {
  public render() {
    const { onFetchMoreDetails, pokemonData } = this.props;

    return (
      <div className='row poke-card' onClick={(e) => onFetchMoreDetails(pokemonData.id)}>
        <div className='col s12 m3'>
          <div className='row'>
            <div className='col s12'>
              <div
                className='pokeball'
              />
            </div>
          </div>
          <div className='row'>
            <div className='col s12 name'>{pokemonData.name}</div>
          </div>
        </div>
      </div>
    );
  }
}
