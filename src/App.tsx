import * as React from 'react';
import '../node_modules/materialize-css/dist/css/materialize.css';
import './App.css';

import { FooterComponent, HeaderComponent } from './core/Components';
import { IPokemon } from './core/Interfaces';
import PokeListComponent from './core/poke-list';

const db: IPokemon[] = require('./dump.json');

class App extends React.Component {
  public render() {
    return (
      <div className='container-fluid pokedex-app'>
        <HeaderComponent />
        <PokeListComponent pokemonList={db}/>
        <FooterComponent />
      </div>
    );
  }
}

export default App;
