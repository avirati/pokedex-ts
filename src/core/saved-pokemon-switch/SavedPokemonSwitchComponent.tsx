import './SavedPokemonSwitch.css';

import * as React from 'react';

interface IProps {
  onSwitchToggled: (toggleState: boolean) => void;
}

export default class SavedPokemonSwitchComponent extends React.Component<IProps> {
  public render() {
    return (
      <div className='switch binary-switch'>
        <label className='right'>
          All
          <input type='checkbox' onChange={(e) => { this.props.onSwitchToggled(e.target.checked); }}/>
          <span className='lever'/>
          Saved
        </label>
      </div>
    );
  }
}
