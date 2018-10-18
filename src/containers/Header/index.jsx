import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { StyledHeader } from '../../components/UI/StyledHeader';
import { StyledNav } from '../../components/UI/StyledNav';

export const Head = ({ ...props }) => {
  const { logged } = props;
  return (
    <StyledHeader>
      <StyledNav>
        <ul>
          <li>
            <Link href="/auth" to="/auth">
                Auth
            </Link>
          </li>
          <li>
            <Link href="/login" to="/login">
                Login
            </Link>
          </li>
          {
            logged ?
              <li>
                <Link href="/profile" to="/profile">
                  Profile
                </Link>
              </li>
          :
          null
          }
          {
            logged ?
              <li>
                <Link href="/issues" to="/issues">
                  Issues
                </Link>
              </li>
            : null
          }
          {
            logged ?
              <li>
                <Link href="/my_issues" to="/my_issues">
                  MyIssues
                </Link>
              </li>
            : null
          }
        </ul>
      </StyledNav>
    </StyledHeader>
  );
};


Head.propTypes = {
  logged: PropTypes.bool.isRequired,
};

export const Header = connect(
  state => ({ logged: state.persistedUser.logged })
)(Head);
