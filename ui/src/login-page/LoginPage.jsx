import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';
import get from 'lodash/get';
import { TAB_NAMES } from '../constants';

/**
 * Component responsible for the login page.
 * Renders a simple form for log in and sign up.
 * Performs validation before submitting API fetch.
 * Re-routes to {@link ListingPage} upon successful validation.
 */
function LoginPage() {
    const baseClass = 'login-page';

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
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (isEmpty(username) || isEmpty(password)) {
            return false;
        }

        if (currentTab === TAB_NAMES.SIGN_UP) {
            const password2 = document.getElementById('password2').value;
            if (isEmpty(password2)) {
                return false;
            }

            if (password !== password2) {
                return false;
            }
        }

        return true;
    }

    const handleSubmit = async () => {
        if (!validateFields()) {
            setShowErrors(true);
        }

        const user_name = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;

        if (currentTab === TAB_NAMES.SIGN_UP) {
            if (password !== password2) {
                setApiError('Passwords do not match');
                return;
            }
            try {
                const payload = await axios.post('/api/users/', {
                    user_name,
                    password,
                });
                const userId = get(payload, 'data.id');
                navigate(`/listing/${userId}/`);
            } catch (e) {
                setShowErrors(true);
                setApiError('Could not create a user with that username');
            }
        } else {
            try {
                const payload = await axios.get(`/api/users/?user_name=${user_name}&password=${password}`);
                const userId = get(get(payload, 'data')[0], 'id');
                navigate(`/listing/${userId}/`);
            } catch (e) {
                setShowErrors(true);
                setApiError('Could not authenticate user credentials');
            }
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
                <div className={`${baseClass}-username-wrapper`}>
                    <span>Username: </span>
                    <input type="text" id="username" name="username"/><br/><br/>
                </div>
                <div className={`${baseClass}-password-wrapper`}>
                    <span>Password: </span>
                    <input type={passwordStyle} id="password" name="password"/>
                    <button onClick={handleShowHideClick}>{showHide}</button><br/>
                </div>
                {showErrors && <span className={`${baseClass}-field-error`}></span> }
                <br/>
                {currentTab === TAB_NAMES.SIGN_UP && (
                    <div className={`${baseClass}-retype-wrapper`}>
                        <span>Re-Type Password: </span>
                        <input type={passwordStyle} id="password2" name="password2" />
                    </div>
                )}
                <button className={`${baseClass}-submit-button`} onClick={handleSubmit}>Submit</button><br/>
                {apiError && <span className={`${baseClass}-api-error`}>{apiError}</span>}
            </div>
        )
    }

    return (
        <div className={`${baseClass}-login-wrapper`}>
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
        </div>
    )
}

export default LoginPage;
