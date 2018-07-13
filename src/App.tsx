import '../node_modules/materialize-css/dist/css/materialize.css';
import './App.css';

import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

import { FooterComponent, HeaderComponent } from './core/Components';
import { IAppState, IPokemon } from './core/Interfaces';
import PokeListComponent from './core/poke-list';

interface IProps {
  pokeList: IPokemon[];
}

interface IState {

}

class App extends React.Component <IProps, IState> {
  public render() {
    return (
      <div className='container-fluid pokedex-app'>
        <HeaderComponent />
        <PokeListComponent pokeList={this.props.pokeList}/>
        <FooterComponent />
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState) => {
  return {
    pokeList: state.pokeList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
