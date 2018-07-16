import '../node_modules/materialize-css/dist/css/materialize.css';
import './App.css';

import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

import { FooterComponent, HeaderComponent } from './core/Components';
import { IAppState, IPokemon } from './core/Interfaces';
import { fetchPokemonList } from './core/actions';
import PokeListComponent from './core/poke-list';

interface IProps {
  pokeList: IPokemon[];
  fetchPokemonList: (limit: number, offset: number) => void;
}

interface IState {
  pokeList: IPokemon[];
}

class App extends React.Component <IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      pokeList: [],
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
      this.props.fetchPokemonList(20, 0);
    }
  }

  public componentWillReceiveProps(nextProps: IProps) {
    console.log(nextProps.pokeList.length);
    this.setState((prevState: IState) => {
      return {
        ...prevState,
        pokeList: [...nextProps.pokeList],
      };
    });
  }

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
  return {
    fetchPokemonList: (limit: number, offset: number) => {
      dispatch(fetchPokemonList(limit, offset));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
