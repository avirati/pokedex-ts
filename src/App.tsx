import '../node_modules/materialize-css/dist/css/materialize.css';
import './App.css';

import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

import { FooterComponent, HeaderComponent } from './core/Components';
import { IAppState, IPokemon } from './core/duck/Interfaces';
import { fetchPokemonList, filterPokemonList } from './core/duck/actions';
import PokeFilterComponent from './core/poke-filter';
import PokeListComponent from './core/poke-list';
import SavedPokemonSwitchComponent from './core/saved-pokemon-switch';
import ScrollHandler from './core/scroll-handler';

interface IProps {
  pokeList: IPokemon[];
  fetchPokemonList: (limit: number, offset: number) => void;
  filterPokemonList: (filterText: string) => void;
}

interface IState {
  pokeList: IPokemon[];
  showSavedPokemon: boolean;
}

class App extends React.Component <IProps, IState> {
  private containerNode: HTMLDivElement;
  private fetchingPokemon: boolean = false;
  private FETCH_LIMIT: number = 20;
  private FETCH_OFFSET: number = 20;

  constructor(props: IProps) {
    super(props);

    this.state = {
      pokeList: [],
      showSavedPokemon: false,
    };
  }

  public componentDidMount() {
    if (this.props.pokeList.length > 0) {
      this.setState((prevState: IState) => {
        return {
          ...prevState,
          pokeList: [...this.props.pokeList],
        };
      });
    } else {
      console.log('Poke List Empty, Fetching from server');
      this.props.fetchPokemonList(this.FETCH_LIMIT, 0);
    }
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState((prevState: IState) => {
      this.fetchingPokemon = false;
      return {
        ...prevState,
        pokeList: [...nextProps.pokeList],
      };
    });
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

  onSavedSwitchToggled(toggledState: boolean) {
    this.setState({
      ...this.state,
      showSavedPokemon: toggledState,
    });
  }

  public render() {
    const onContainerEndReached = this.onContainerEndReached.bind(this);
    const onFilterTextChanged = this.onFilterTextChanged.bind(this);
    const onSavedSwitchToggled = this.onSavedSwitchToggled.bind(this);
    return (
      <div className='container-fluid pokedex-app' ref={(ref: HTMLDivElement) => { this.containerNode = ref; }}>
        <HeaderComponent />
        <div className='pokemon-controls'>
          <PokeFilterComponent onFilterTextChanged={onFilterTextChanged}/>
          <SavedPokemonSwitchComponent onSwitchToggled={onSavedSwitchToggled}/>
        </div>
        <ScrollHandler targetElement={this.containerNode} onEndReached={onContainerEndReached}>
          <PokeListComponent pokeList={this.props.pokeList} showSavedPokemon={this.state.showSavedPokemon}/>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
