import './PokeCard.css';

import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

import { IPokemon } from '../Interfaces';
import { fetchMoreDetails } from '../actions';
import PokeBallElement from './PokeBallElement';
import PokemonMovesElement from './PokemonMovesElement';
import PokemonPreviewElement from './PokemonPreviewElement';
import PokemonStatElement from './PokemonStatElement';

interface IProps {
  pokemonData: IPokemon;
  onFetchMoreDetails?: (id: number) => void;
}

interface IMapperProps {
  onFetchMoreDetails?: (id: number) => void;
}

interface IState {

}

class PokeCardComponent extends React.Component <IProps, IState> {
  public render() {
    const { pokemonData, onFetchMoreDetails = (id: number) => console.log(id) } = this.props;
    const pData = pokemonData.researchData;

    if (pData) {
      return (
        <div className='row poke-card'>
          <div
            className='col s12 research-card'>
            <PokemonPreviewElement imageSrc={pData.sprites.front_default}/>
            <div className='description-container'>
              <PokemonStatElement label={'Name:'} value={pokemonData.name}/>
              <PokemonStatElement label={'XP:'} value={pData.base_experience}/>
              <PokemonStatElement label={'Height:'} value={pData.height}/>
              <PokemonStatElement label={'Weight:'} value={pData.weight}/>
              {
                pData.stats.map((obj, index) => {
                  return <PokemonStatElement label={obj.stat.name} value={obj.base_stat} key={index}/>;
                })
              }
              <PokemonMovesElement movesList={pData.moves}/>
            </div>
            <div
              className='heart'
            />
          </div>
        </div>
      );
    } else {
      return (
        <PokeBallElement pokemonData={pokemonData} onFetchMoreDetails={onFetchMoreDetails}/>
      );
    }
  }
}

const mapStateToProps = (state: IState): IState => {
  return state;
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IMapperProps => {
  return {
    onFetchMoreDetails: (id: number) => {
      dispatch(fetchMoreDetails(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokeCardComponent);
