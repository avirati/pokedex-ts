import * as React from 'react';
import { IPokemonMoves } from '../Interfaces';

interface IProps {
  movesList: IPokemonMoves[];
}

export default class PokemonMovesElement extends React.Component <IProps> {
  public render() {
    const { movesList } = this.props;
    return (
      <div className='row margin-bottom--0 only-desktop moves-list'>
        <div className='col s12'>
        {
          movesList.map((obj, index) => {
            return (
              <div className='pill' key={index}>
                {obj.move.name}
              </div>
            );
          })
        }
        </div>
      </div>
    );
  }
}
