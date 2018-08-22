import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState, IPokemon } from '../duck/Interfaces';
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

const mapStateToProps = (state: IAppState) => {
  return {
    favoriteToggleSwitch: state.favoriteToggleSwitch,
    pokeList: state.pokeList,
  };
};

export default connect (
  mapStateToProps,
)(PokeListComponent);
