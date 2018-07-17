import './PokeFilter.css';

import * as React from 'react';

export default class PokeFilterComponent extends React.Component {
  public render() {
    return (
      <input type='text' className='left pokemon-filter' placeholder='Filter Pokemon !'/>
    );
  }
}
