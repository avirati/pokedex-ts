import './PokeCard.css';

import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

import { IPokemon } from '../Interfaces';
import { fetchMoreDetails } from '../actions';
import PokeBall from './PokeBall';

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
            <div className='image-container'>
              <div className='row'>
                <div className='col s12'>
                  <img src={pData.sprites.front_default} className='pokemon-avatar'/>
                </div>
              </div>
            </div>
            <div className='description-container'>
              <div className='row margin-bottom--0'>
                <div className='col s12'>
                  <label>Name: </label>
                  <span>{pokemonData.name}</span>
                </div>
              </div>
              <div className='row margin-bottom--0'>
                <div className='col s12'>
                  <label>XP: </label>
                  <span>{pData.base_experience}</span>
                </div>
              </div>
              <div className='row margin-bottom--0'>
                <div className='col s12'>
                  <label>Height: </label>
                  <span>{pData.height}</span>
                </div>
              </div>
              <div className='row margin-bottom--0'>
                <div className='col s12'>
                  <label>Weight: </label>
                  <span>{pData.weight}</span>
                </div>
              </div>
              <div
                className='row margin-bottom--0'
                ng-repeat='obj in pData.stats'
              >
                {
                pData.stats.map((obj, index) => {
                  return (
                    <div className='col s12' key={index}>
                      <label>{obj.stat.name}</label>
                      <span>{obj.base_stat}</span>
                    </div>
                  );
                })
              }
              </div>
              <div className='row margin-bottom--0 only-desktop moves-list'>
                <div className='col s12'>
                {
                  pData.moves.map((obj, index) => {
                    return (
                      <div className='pill' key={index}>
                        {obj.move.name}
                      </div>
                    );
                  })
                }
                </div>
              </div>
            </div>
            <div
              className='heart'
              ng-click='PokeCardCtrl.toggleSavePokemon()'
            />
          </div>
        </div>
      );
    } else {
      return (
        <PokeBall pokemonData={pokemonData} onFetchMoreDetails={onFetchMoreDetails}/>
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
