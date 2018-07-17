import './SavedPokemonSwitch.css';

import * as React from 'react';

export default class SavedPokemonSwitchComponent extends React.Component {
  public render() {
    return (
      <div className='switch binary-switch'>
        <label className='right'>
          All
          <input type='checkbox' />
          <span className='lever'/>
          Saved
        </label>
      </div>
    );
  }
}
