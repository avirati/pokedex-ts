import * as React from 'react';

interface IProps {
  label: string;
  value: string | number;
}

export default class PokemonStatElement extends React.Component<IProps> {
  public render() {
    const { label, value } = this.props;
    return (
      <div className='row margin-bottom--0'>
        <div className='col s12'>
          <label>{label}</label>
          <span>{value}</span>
        </div>
      </div>
    );
  }
}
