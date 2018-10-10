import React from 'react';
import { connect } from 'react-redux';

import { UserProfile } from '../UserProfile';
import { UserNotification } from '../UserNotification';

const Page = () => (
  <div id="root">
    <UserNotification />
    <UserProfile />
  </div>
);

export const ProfilePage = connect(
  state => ({
    user: state.persistedUser
  })
)(Page);
