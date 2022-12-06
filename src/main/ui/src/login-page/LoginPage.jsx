import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { TAB_NAMES } from '../constants';

/**
 * Component responsible for the login page.
 * Renders a simple form for log in and sign up.
 * Performs validation before submitting API fetch.
 * Re-routes to {@link ListingPage} upon successful validation.
 */
function LoginPage({ baseClass }) {

    const navigate = useNavigate();

    const [currentTab, setCurrentTab] = useState(TAB_NAMES.LOG_IN);
    const [passwordStyle, setPasswordStyle] = useState('password');
    const [showHide, setShowHide] = useState('Show');
    const [showErrors, setShowErrors] = useState(false);
    const [apiError, setApiError] = useState('');

    const getTabStyle = (tabName) => {
        if (tabName === currentTab) {
            return cn(`${baseClass}-tab`, 'currentTab');
        }

        return `${baseClass}-tab`;
    }

    const validateFields = () => {
        const username = document.getElementById('username').textContent;
        const password = document.getElementById('password').textContent;
        const password2 = document.getElementById('password2').textContent;

        if (isEmpty(username) || isEmpty(password)) {
            return false;
        }

        if (currentTab === TAB_NAMES.SIGN_UP && isEmpty(password2)) {
            return false;
        }

        return !(currentTab === TAB_NAMES.SIGN_UP && password !== password2);
    }

    const handleSubmit = async () => {
        if (!validateFields()) {
            setShowErrors(true);
        }

        const apiEndpoint = currentTab === TAB_NAMES.SIGN_UP
            ? '/api/createUser'
            : '/api/validateUser';

        try {
            await fetch(apiEndpoint, {
                username: document.getElementById('username').textContent,
                password: document.getElementById('password').textContent,
            });
            navigate('listing');
        } catch (e) {
            setShowErrors(true);
            setApiError(e.message);
        }
    }

    const renderForm = () => {
        const handleShowHideClick = () => {
            if (passwordStyle === 'password') {
                setPasswordStyle('text');
                setShowHide('Hide');
            }
            else {
                setPasswordStyle('password');
                setShowHide('Show');
            }
        }

        return (
            <div className={`${baseClass}-form`}>
                <input type="text" id="username" name="username"/><br/><br/>
                {showErrors && <span className={`${baseClass}-field-error`}>Invalid Username</span> }
                <input type={passwordStyle} id="password" name="password"/>
                {showErrors && <span className={`${baseClass}-field-error`}>Invalid Password</span> }
                {currentTab === TAB_NAMES.SIGN_UP && <input type={passwordStyle} id="password2" name="password2" />}
                <button onClick={handleShowHideClick}>{showHide}</button><br/><br/>
                <button onClick={handleSubmit}>Submit</button>
                {showErrors && <span className={`${baseClass}-api-error`}>{apiError}</span>}
            </div>
        )
    }

    return (
        <div className={`${baseClass}-login-frame`}>
            <div className={`${baseClass}-tab-frame`}>
                <button className={getTabStyle(TAB_NAMES.LOG_IN)} onClick={() => setCurrentTab(TAB_NAMES.LOG_IN)}>
                    Log In
                </button>
                <button className={getTabStyle(TAB_NAMES.SIGN_UP)} onClick={() => setCurrentTab(TAB_NAMES.SIGN_UP)}>
                    Sign Up
                </button>
            </div>
            {renderForm()}
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
