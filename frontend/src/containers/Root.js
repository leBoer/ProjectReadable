import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AsyncApp from './AsyncApp';
import Header from '../components/Header.jsx';
import NewPost from './NewPost.jsx';
import Post from './Post.jsx';
import Error404 from './Error404.jsx';


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
                    <Route exact path="/404" component={Error404} />
                    <Route path="/newpost" component={NewPost} />
                    <Route exact path="/:category" component={AsyncApp} />
                    <Route path="/:category/:id" component={Post} />
                </Switch>
            </div>
        </Router>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root;
