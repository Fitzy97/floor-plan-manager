import React from 'react';
import PropTypes from 'prop-types';

function LoginPage({ baseClass }) {

    return (
        <div className={`${baseClass}-login-frame`}>

        </div>
    )
}

LoginPage.defaultProps = {
    baseClass: 'login-page',
}

LoginPage.propTypes = {
    /**
     * this component's class prefix
     */
    baseClass: PropTypes.string,
}

export default LoginPage;