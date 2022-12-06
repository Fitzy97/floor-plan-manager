import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Component for the page where the user can view a specific floor plan.
 * Displays the layout with height, width of floor, and individual rooms
 * and their doors, heights and widths.
 */
function ViewerPage({ baseClass }) {

    const { floorPlanId } = useParams();
    const navigate = useNavigate();

    const [floorPlan, setFloorPlan] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        async function fetchFloorPlan() {
            const { payload } = await fetch('api/getFloorPlan', { floorPlanId });
            setFloorPlan(payload);
        }

        try {
            fetchFloorPlan();
        } catch(e) {
            setShowErrors(true);
            setApiError(e.message);
        }
    }, [floorPlanId]);

    return (
        <div className={baseClass}>
            <div className={`${baseClass}-titlebar`}>
                <button className={`${baseClass}-backbutton`} onClick={() => navigate('listing')}>
                    Back
                </button>
                <span className={`${baseClass}-title`}>{floorPlan.title}</span>
            </div>
            <div className={`${baseClass}-floorplan`}>
                {floorPlan.map((row) =>
                    <div className={`${baseClass}-row`}>
                        {row.map((room) =>
                            <div className={`${baseClass}-room-${room.top}-${room.right}-${room.bottom}-${room.left}`}></div>
                        )}
                    </div>
                )}
            </div>
            {showErrors && <span className={`${baseClass}-apierror`}>{apiError}</span>}
        </div>
    )
}

ViewerPage.defaultProps = {
    baseClass: 'viewer-page',
}

ViewerPage.propTypes = {
    /**
     * The css class name for this component
     */
    baseClass: PropTypes.string,
}

export default ViewerPage;
