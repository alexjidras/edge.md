import React from 'react';
import { Link, Route} from "react-router-dom";

const TopLink = ({ label, to, exact }) => (
    <Route
      path={to}
      exact={exact}
      children={({ match }) => (
        <li className={match ? "toplink selected" : "toplink"}>
          <Link to={to}>{label}</Link>
        </li>
      )}
    />
  );

  export default TopLink;