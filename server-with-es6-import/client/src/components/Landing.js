import React from 'react';
import { connect } from 'react-redux';

import DashBoard from './DashBoard';

const Landing = (props) => {
    if (props.auth) {
        return <DashBoard />;
    }


    return (
        <div style={{textAlign: 'center'}}>
            <h1>
                Sirvey!
            </h1>
            <p>Collect feedback from your users</p>
        </div>
    );
};

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(Landing);