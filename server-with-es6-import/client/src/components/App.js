import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Landing from './Landing';
import DashBoard from './DashBoard';
import SurveyNew from './surveys/SurveyNew';
import * as actions from '../actions';

class App extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        <Route path="/" component={Landing} exact />
                        <Route path="/surveys" component={DashBoard} exact />
                        <Route
                            path="/surveys/new"
                            component={SurveyNew}
                            exact
                        />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);
