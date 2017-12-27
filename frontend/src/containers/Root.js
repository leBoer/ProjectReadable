import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AsyncApp from './AsyncApp';
import Header from '../components/Header';
import NewPost from './NewPost';
import Post from './Post.jsx';


const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <div>
          <header>
            <Header />
          </header>
        </div>
        <Switch>
          <Route exact path="/" component={AsyncApp} />
          <Route path="/newpost" component={NewPost} />
          <Route path="/post/:id" component={Post} />
        </Switch>
      </div>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;
