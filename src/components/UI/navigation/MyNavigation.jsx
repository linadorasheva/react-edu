import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthNav from '../../AuthNav/AuthNav.jsx';

const MyNavigation = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'navigation__link navigation__link--active'
                : 'navigation__link'
            }
            end
          >
            Main Page
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              isActive
                ? 'navigation__link navigation__link--active'
                : 'navigation__link'
            }
            end
          >
            Posts
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'navigation__link navigation__link--active'
                : 'navigation__link'
            }
          >
            About
          </NavLink>
        </li>
      </ul>
      <AuthNav />
    </nav>
  );
};

export default MyNavigation;
