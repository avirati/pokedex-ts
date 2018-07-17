import './PokeFilter.css';

import * as React from 'react';

interface IProps {
  onFilterTextChanged: (filterText: string) => void;
}

export default class PokeFilterComponent extends React.Component<IProps> {
  public render() {
    const { onFilterTextChanged } = this.props;
    return (
      <input type='text' className='left pokemon-filter' placeholder='Filter Pokemon !' onChange={(e) => { onFilterTextChanged(e.target.value); }}/>
    );
  }
}
