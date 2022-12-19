import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import find from 'lodash/find';

/**
 * Renders a list of floor plans created by the user.
 * Requires a URL param userId.
 * Upon clicking a floor plan, the user is redirected to the {@link ViewerPage}
 */
function ListingPage() {

    const baseClass = 'listing-page';

    const { userId } = useParams();
    const navigate = useNavigate();

    const [floorPlans, setFloorPlans] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        async function fetchFloorPlans() {
            const payload = await axios.get(`/api/floorPlans/?user=${userId}`);
            setFloorPlans(get(payload, 'data'));
        }

        try {
            fetchFloorPlans();
        } catch (e) {
            setShowErrors(true);
            setApiError(e.message);
        }
    }, [userId]);

    const handleListingClick = (floorPlanId) => {
        navigate(`/viewer/${floorPlanId}`, {
            state: {
                ...find(floorPlans, (floorPlan) =>
                    get(floorPlan, 'id') === floorPlanId
                )
            }
        });
    }

    const handleCreateNew = () => {
        navigate(`/creator/${userId}`);
    }

    return (
        <div className={baseClass}>
            <div className={`${baseClass}-wrapper`}>
                <button className={`${baseClass}-createbutton`} onClick={handleCreateNew}>Create +</button>
                <div className={`${baseClass}-scrollpane`}>
                    {isEmpty(floorPlans) ? (
                        <span className={`${baseClass}-no-floorplans`}>No floor plans saved</span>
                    ) : (
                        <ol>
                            {floorPlans.map((floorPlan) =>
                                <li className={`${baseClass}-floorplan`} onClick={() => handleListingClick(floorPlan.id)}>
                                    {floorPlan.title}
                                </li>
                            )}
                        </ol>
                    )}
                </div>
                {showErrors && <span className={`${baseClass}-apierror`}>{apiError}</span>}
            </div>
        </div>
    )
}

export default ListingPage;
