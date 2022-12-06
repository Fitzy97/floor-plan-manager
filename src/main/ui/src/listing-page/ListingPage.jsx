import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Renders a list of floor plans created by the user.
 * Requires a URL param userId.
 * Upon clicking a floor plan, the user is redirected to the {@link ViewerPage}
 */
function ListingPage({ baseClass }) {

    const { userId } = useParams();
    const navigate = useNavigate();

    const [floorPlans, setFloorPlans] = useState([]);
    const [userName, setUserName] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        async function fetchFloorPlans() {
            const { payload } = await fetch('api/getFloorPlans', { userId });
            setFloorPlans(payload.floorPlans);
            setUserName(payload.userName)
        }

        try {
            fetchFloorPlans();
        } catch (e) {
            setShowErrors(true);
            setApiError(e.message);
        }
    }, [userId]);

    const handleListingClick = (floorPlanId) => {
        navigate(`viewer/${floorPlanId}`);
    }

    return (
        <div className={baseClass}>
            <span className={`${baseClass}-titlebar`}>{userName}</span>
            <ol>
                {floorPlans.map((floorPlan) => <li className={`${baseClass}-floorplan`} onClick={() => handleListingClick(floorPlan.id)}>{floorPlan.title}</li>)}
            </ol>
            {showErrors && <span className={`${baseClass}-apierror`}>{apiError}</span>}
        </div>
    )
}

ListingPage.defaultProps = {
    baseClass: 'listing-page',
}

ListingPage.propTypes = {
    /**
     * Css style classname for this component
     */
    baseClass: PropTypes.string,
}

export default ListingPage;
