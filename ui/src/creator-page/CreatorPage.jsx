import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

/**
 * Displays a form for the user to input new floor plan
 * criteria.  If the criteria is invalid, no floor plan will be created.
 * Upon successful creation of a floor plan, the user is redirected to
 * the {@link ListingPage}
 */
function CreatorPage() {

    const baseClass = 'creator-page';
    const { userId } = useParams();
    const navigate = useNavigate();

    const [showErrors, setShowErrors] = useState(false);
    const [apiError, setApiError] = useState('');
    const [errors, setErrors] = useState({})

    const setError = (key, errorMessage) => {
        setErrors(errors => ({
            ...errors,
            [key]: errorMessage,
        }));
    }

    const validateFields = () => {
        const title = document.getElementById("title").value;
        if (isEmpty(title)) {
            setError('title', 'Title cannot be empty');
            return false;
        }
        const width = document.getElementById("width").value;
        if (isEmpty(width)) {
            setError('width', 'Width cannot be empty');
            return false;
        }
        const w = parseInt(width);
        if (w < 3) {
            setError('width', 'Width must be at least 3 feet to fit doors');
            return false;
        }

        const height = document.getElementById("height").value;
        if (isEmpty(height)) {
            setError('height', 'Height cannot be empty');
            return false;
        }
        const h = parseInt(height);
        if (h < 3) {
            setError('height', 'Height must be at least 3 feet to fit doors');
            return false;
        }

        const minLength = document.getElementById("minLength").value;
        if (isEmpty(minLength)) {
            setError('minLength', 'Minimum length/height of rooms cannot be empty');
            return false;
        }
        const minL = parseInt(minLength);
        if (minL < 3) {
            setError('minLength', 'Minimum length must be at least 3 feet to fit doors');
            return false;
        }
        const maxLength = document.getElementById("maxLength").value;
        if (isEmpty(maxLength)) {
            setError('maxLength', 'Maximum length/height of rooms cannot be empty');
            return false;
        }
        const maxL = parseInt(maxLength);
        if (maxL < 3) {
            setError('maxLength', 'Maximum length must be at least 3 feet to fit doors');
            return false;
        }

        if (maxL < minL) {
            setError('maxLength', 'Maximum length must be larger than minimum length');
            return false;
        }

        const maxDoors = document.getElementById("maxDoors").value;
        if (isEmpty(maxDoors)) {
            setError('maxDoors', 'Maximum number of doors per room cannot be empty');
            return false;
        }

        return true;
    }

    const handleSave = async () => {
        setErrors({});
        if (!validateFields()) {
            setShowErrors(true);
            return;
        }

        const title = document.getElementById("title").value;
        const width = document.getElementById("width").value;
        const height = document.getElementById("height").value;
        const minLength = document.getElementById("minLength").value;
        const maxLength = document.getElementById("maxLength").value;
        const maxDoors = document.getElementById("maxDoors").value;

        try {
            await axios.post('/api/floorPlans/', {
                user_id: userId,
                title,
                width: parseInt(width),
                height: parseInt(height),
                min_length: parseInt(minLength),
                max_length: parseInt(maxLength),
                max_doors: parseInt(maxDoors),
            });
            navigate(`/listing/${userId}`);
        } catch (e) {
            setShowErrors(true);
            setApiError('Could not create a floor plan with that configuration');
        }
    }

    return (
        <div className={`${baseClass}`}>
            <div className={`${baseClass}-wrapper`}>
                <span>Title: </span>
                <input type="text" name="title" id="title" /><br/>
                {showErrors && <>
                    <span className={`${baseClass}-error`}>{get(errors, 'title')}</span><br/>
                </> }
                <span>Width (in feet):</span>
                <input type="number" name="width" id="width" /><br/>
                {showErrors && <>
                    <span className={`${baseClass}-error`}>{get(errors, 'width')}</span><br/>
                </> }
                <span>Height (in feet):</span>
                <input type="number" name="height" id="height" /><br/>
                {showErrors && <>
                    <span className={`${baseClass}-error`}>{get(errors, 'height')}</span><br/>
                </> }
                <span>Minimum length/height of rooms (in feet):</span>
                <input type="number" name="minLength" id="minLength" /><br/>
                {showErrors && <>
                    <span className={`${baseClass}-error`}>{get(errors, 'minLength')}</span><br/>
                </> }
                <span>Maximum length/height of rooms (in feet):</span>
                <input type="number" name="maxLength" id="maxLength" /><br/>
                {showErrors && <>
                    <span className={`${baseClass}-error`}>{get(errors, 'maxLength')}</span><br/>
                </> }
                <span>Maximum number of doors per room:</span>
                <input type="number" name="maxDoors" id="maxDoors" /><br/>
                {showErrors && <>
                    <span className={`${baseClass}-error`}>{get(errors, 'maxDoors')}</span><br/>
                </> }
                <button className={`${baseClass}-submitbutton`} onClick={handleSave}>
                    Submit
                </button>
                {showErrors && <span className={`${baseClass}-error`}>{apiError}</span>}
            </div>
        </div>
    );
}

export default CreatorPage;
