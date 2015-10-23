import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import AppContainer from '../containers/AppContainer';
import HomePageContainer from '../containers/HomePageContainer';
import solution from '../containers/solution'
import AboutPageContainer from '../containers/AboutPageContainer';


export default (
  <Route path="/" handler={HomePageContainer}>
    <DefaultRoute name="home" handler={HomePageContainer} />
    <Route name="about" handler={AboutPageContainer} />
  </Route>
);
