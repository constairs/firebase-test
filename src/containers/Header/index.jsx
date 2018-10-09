import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link href="/" to="/">
              Auth
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);
