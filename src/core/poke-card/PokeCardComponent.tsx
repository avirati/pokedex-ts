import * as React from 'react';

import { IPokeCardProps } from '../Interfaces';

export default class PokeCardComponent extends React.Component <IPokeCardProps> {
  public render() {
    const { pokemonData } = this.props;
    return (
      <div className='row poke-card' ng-click='PokeCardCtrl.revealPokemon()'>
        <div className='col s12 m3' ng-if='!pokemon.researchData'>
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
        <div
          className='col s12 research-card'
          ng-if='pokemon.researchData'
          ng-init='pData = pokemon.researchData'
        >
          <div className='image-container'>
            <div className='row'>
              <div className='col s12'>
                <img
                  ng-src='{{pData.sprites.front_default}}'
                  alt=''
                  className='pokemon-avatar'
                />
              </div>
            </div>
          </div>
          <div className='description-container'>
            <div className='row margin-bottom--0'>
              <div className='col s12'>
                <label>Name: </label>
                <span>Pokemon dot Name</span>
              </div>
            </div>
            <div className='row margin-bottom--0'>
              <div className='col s12'>
                <label>XP: </label>
                <span>Pokemon dot base_experience</span>
              </div>
            </div>
            <div className='row margin-bottom--0'>
              <div className='col s12'>
                <label>Height: </label>
                <span>Pokemon dot height</span>
              </div>
            </div>
            <div className='row margin-bottom--0'>
              <div className='col s12'>
                <label>Weight: </label>
                <span>Pokemon dot weight</span>
              </div>
            </div>
            <div
              className='row margin-bottom--0'
              ng-repeat='obj in pData.stats'
            >
              <div className='col s12'>
                <label>Obj dot stat dot name</label>
                <span>Obj dot base_stat</span>
              </div>
            </div>

            <div className='row margin-bottom--0 only-desktop moves-list'>
              <div className='col s12'>
                <div className='pill' ng-repeat='obj in pData.moves'>
                  Obj dot move dot name
                </div>
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
  }
}
