import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from '../Routes/Routes.js';
import { withRouter } from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {

  return (
    <div className="bodyy">
      <section>
        <header>
          <div className="navBox">
            <ul className="extra">
              <li>
                <Link to={ROUTES.HOME}>Home</Link>
              </li>
              <li>
                <Link to={ROUTES.STATS}>STATS</Link>
              </li>
              <img className="logout" type="image" src="covid19.png" />
            </ul>
          </div>
          
        </header>
      </section>
    </div>
  );
}
export default withRouter(Navigation);
