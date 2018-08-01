import './PokeCard.css';

import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

import { IPokemon } from '../duck/Interfaces';
import PokeBallElement from './PokeBallElement';
import PokemonMovesElement from './PokemonMovesElement';
import PokemonPreviewElement from './PokemonPreviewElement';
import PokemonStatElement from './PokemonStatElement';
import { favoriteToggled, fetchMoreDetails } from './duck/actions';

interface IProps {
  pokemonData: IPokemon;
  onFetchMoreDetails?: (id: number) => void;
  onFavoriteToggled?: (id: number) => void;
}

interface IMapperProps {
  onFetchMoreDetails?: (id: number) => void;
  onFavoriteToggled?: (id: number) => void;
}

interface IState {

}

class PokeCardComponent extends React.Component <IProps, IState> {
  public render() {
    const { pokemonData,
            onFetchMoreDetails = (id: number) => console.log(id),
            onFavoriteToggled = (id: number) => console.log(id) } = this.props;
    const researchData = pokemonData.researchData;

    const heartClass = pokemonData.favorite ? 'heart active' : 'heart';

    if (researchData) {
      return (
        <div className='row poke-card'>
          <div
            className='col s12 research-card'>
            <PokemonPreviewElement imageSrc={researchData.sprites.front_default}/>
            <div className='description-container'>
              <PokemonStatElement label={'Name:'} value={pokemonData.name}/>
              <PokemonStatElement label={'XP:'} value={researchData.base_experience}/>
              <PokemonStatElement label={'Height:'} value={researchData.height}/>
              <PokemonStatElement label={'Weight:'} value={researchData.weight}/>
              {
                researchData.stats.map((obj, index) => {
                  return <PokemonStatElement label={obj.stat.name} value={obj.base_stat} key={index}/>;
                })
              }
              <PokemonMovesElement movesList={researchData.moves}/>
            </div>
            <div className={heartClass} onClick={(e) => { onFavoriteToggled(pokemonData.id); }}/>
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
    onFavoriteToggled: (id: number) => {
      dispatch(favoriteToggled(id));
    },
    onFetchMoreDetails: (id: number) => {
      dispatch(fetchMoreDetails(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokeCardComponent);
