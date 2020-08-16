import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    renderContent = () => {
        switch (this.props.auth) {
            case null: // Loading
                return;
            case false: // Log out
                return (
                    <li>
                        <a href="/auth/google">Login with Google</a>
                    </li>
                );
            default:
                // Log in
                return (
                    <li>
                        <a href="/api/logout">Logout</a>
                    </li>
                );
        }
    };

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    {/* Link tag is for navigating to the same page, a tag is for
                    navigating to a different document */}
                    <Link to={this.props.auth ? '/surveys' : '/'} className="brand-logo">
                        Sirvey
                    </Link>
                    <ul className="right">{this.renderContent()}</ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(Header);
