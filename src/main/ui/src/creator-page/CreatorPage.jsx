import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * Displays a form for the user to input new floor plan
 * criteria.  If the criteria is invalid, no floor plan will be created.
 * Upon successful creation of a floor plan, the user is redirected to
 * the {@link ListingPage}
 */
function CreatorPage({ baseClass }) {

    const { userId } = useParams();
    const navigate = useNavigate();

    const [showErrors, setShowErrors] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleSave = async () => {
        const title = document.getElementById("title").textContent;
        const width = document.getElementById("width").textContent;
        const height = document.getElementById("height").textContent;
        const maxWidth = document.getElementById("maxWidth").textContent;
        const maxHeight = document.getElementById("maxHeight").textContent;
        const maxDoors = document.getElementById("maxDoors").textContent;

        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    userId, title, width, height, maxWidth, maxHeight, maxDoors,
                })
            }
            await fetch('api/createFloorPlan', options);
            navigate(`listing/${userId}`)
        } catch (e) {
            setShowErrors(true);
            setApiError(e.message);
        }
    }

    return (
        <div className={`${baseClass}`}>
            <input type="text" name="title" id="title" /><br/>
            <input type="number" name="width" id="width" /><br/>
            <input type="number" name="height" id="height" /><br/>
            <input type="number" name="maxWidth" id="maxWidth" /><br/>
            <input type="number" name="maxHeight" id="maxHeight" /><br/>
            <input type="number" name="maxDoors" id="maxDoors" /><br/>
            <button className={`${baseClass}-submitbutton`} onClick={handleSave}>
                Submit
            </button>
            {showErrors && <span className={`${baseClass}-apierror`}>{apiError}</span>}
        </div>
    )
}

CreatorPage.defaultProps = {
    baseClass: 'creator-page',
}

CreatorPage.propTypes = {
    /**
     * Style prefix for this component
     */
    baseClass: PropTypes.string,
}

export default CreatorPage;
