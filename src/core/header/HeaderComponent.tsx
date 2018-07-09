import * as React from 'react';
import './Header.css';

export default class HeaderComponent extends React.Component {
  public render() {
    return (
      <header className='page-topbar' id='header'>
        <div className='navbar-fixed'>
          <nav className='blue-grey darken-4'>
            <div className='nav-wrapper'>
              <ul className='left'>
                <li>
                  <h1 className='logo-wrapper'>
                    <a className='brand-logo darken-1'>Pokedex</a>
                  </h1>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}
