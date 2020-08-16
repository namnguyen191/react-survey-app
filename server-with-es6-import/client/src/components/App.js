import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Landing from './Landing';
import * as actions from '../actions';

const DashBoard = () => {
    return <h2>DashBoard</h2>;
};

const SurveyNew = () => {
    return <h2>SurveyNew</h2>;
};

class App extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
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
