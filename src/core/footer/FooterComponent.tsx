import * as React from "react";
import "./Footer.css";

export default class FooterComponent extends React.Component {
  public render() {
    return (
      <footer className="page-footer blue-grey darken-4">
        <div className="footer-copyright">
          Made with ♥ in Mumbai &nbsp;&nbsp;&nbsp;&nbsp;<a
            href="https://github.com/avirati/pokedex"
            target="_blank"
          >
            Github
          </a>
        </div>
      </footer>
    );
  }
}
