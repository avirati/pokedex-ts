import '../node_modules/materialize-css/dist/css/materialize.css';
import './App.css';

import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

import { FooterComponent, HeaderComponent } from './core/Components';
import { IAppState, IPokemon } from './core/duck/Interfaces';
import { fetchPokemonList, filterPokemonList, showSavedPokemon } from './core/duck/actions';
import PokeFilterComponent from './core/poke-filter';
import PokeListComponent from './core/poke-list';
import SavedPokemonSwitchComponent from './core/saved-pokemon-switch';
import ScrollHandler from './core/scroll-handler';

interface IProps {
  pokeList: IPokemon[];
  fetchPokemonList: (limit: number, offset: number) => void;
  filterPokemonList: (filterText: string) => void;
  showSavedPokemon: (toggledState: boolean) => void;
}

class App extends React.Component <IProps, IAppState> {
  private containerNode: HTMLDivElement;
  private fetchingPokemon: boolean = false;
  private FETCH_LIMIT: number = 20;
  private FETCH_OFFSET: number = 20;

  public componentDidMount() {
    if (this.props.pokeList.length === 0) {
      console.log('Poke List Empty, Fetching from server');
      this.props.fetchPokemonList(this.FETCH_LIMIT, 0);
    }
  }

  onContainerEndReached() {
    if (!this.fetchingPokemon) {
      this.props.fetchPokemonList(this.FETCH_LIMIT, this.props.pokeList.length + this.FETCH_OFFSET);
      this.fetchingPokemon = true;
    }
  }

  onFilterTextChanged(filterText: string) {
    this.props.filterPokemonList(filterText);
  }

  public render() {
    const onContainerEndReached = this.onContainerEndReached.bind(this);
    const onFilterTextChanged = this.onFilterTextChanged.bind(this);
    const onSavedSwitchToggled = this.props.showSavedPokemon.bind(this);
    return (
      <div className='container-fluid pokedex-app' ref={(ref: HTMLDivElement) => { this.containerNode = ref; }}>
        <HeaderComponent />
        <div className='pokemon-controls'>
          <PokeFilterComponent onFilterTextChanged={onFilterTextChanged}/>
          <SavedPokemonSwitchComponent onSwitchToggled={onSavedSwitchToggled}/>
        </div>
        <ScrollHandler targetElement={this.containerNode} onEndReached={onContainerEndReached}>
          <PokeListComponent/>
        </ScrollHandler>
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
  return {
    fetchPokemonList: (limit: number, offset: number) => {
      dispatch(fetchPokemonList(limit, offset));
    },
    filterPokemonList: (filterText: string) => {
      dispatch(filterPokemonList(filterText));
    },
    showSavedPokemon: (toggledState: boolean) => {
      dispatch(showSavedPokemon(toggledState));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
