import * as React from 'react';

interface IProps {
  imageSrc: string;
}

export default class PokemonPreviewElement extends React.Component<IProps> {
  public render() {
    const { imageSrc } = this.props;
    return (
      <div className='image-container'>
        <div className='row'>
          <div className='col s12'>
            <img src={imageSrc} className='pokemon-avatar'/>
          </div>
        </div>
      </div>
    );
  }
}
