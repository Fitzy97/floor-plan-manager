import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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

    const handleSave = async () => {
        const title = document.getElementById("title").textContent;
        const width = document.getElementById("width").textContent;
        const height = document.getElementById("height").textContent;
        const maxWidth = document.getElementById("maxWidth").textContent;
        const maxHeight = document.getElementById("maxHeight").textContent;
        const maxDoors = document.getElementById("maxDoors").textContent;

        try {
            await axios.post('api/createFloorPlan', {
                userId, title, width, height, maxWidth, maxHeight, maxDoors
            });
            navigate(`listing/${userId}`);
        } catch (e) {
            setShowErrors(true);
            setApiError(e.message);
        }
    }

    return (
        <div className={`${baseClass}`}>
            <div className={`${baseClass}-wrapper`}>
                <span>Title: </span>
                <input type="text" name="title" id="title" /><br/>
                <span>Width (in feet):</span>
                <input type="number" name="width" id="width" /><br/>
                <span>Height (in feet):</span>
                <input type="number" name="height" id="height" /><br/>
                <span>Maximum width of rooms (in feet):</span>
                <input type="number" name="maxWidth" id="maxWidth" /><br/>
                <span>Maximum height of rooms (in feet):</span>
                <input type="number" name="maxHeight" id="maxHeight" /><br/>
                <span>Maximum number of doors:</span>
                <input type="number" name="maxDoors" id="maxDoors" /><br/>
                <button className={`${baseClass}-submitbutton`} onClick={handleSave}>
                    Submit
                </button>
                {showErrors && <span className={`${baseClass}-apierror`}>{apiError}</span>}
            </div>
        </div>
    );
}

export default CreatorPage;
