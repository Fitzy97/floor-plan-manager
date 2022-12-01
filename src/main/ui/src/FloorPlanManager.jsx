import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './App.css';

function FloorPlanManager({ baseClass }) {

    const [blah, setBlah] = useState('');

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/blah`);

            setBlah(await new Response(response.body).text());
        }
        fetchData();
    }, [setBlah]);

    return (
        <div className={baseClass}>
            {blah}
        </div>
    );
}

FloorPlanManager.defaultProps = {
    baseClass: 'floor-plan-manager',
}

FloorPlanManager.propTypes = {
    /**
     * The app's style selector
     */
    baseClass: PropTypes.string,
}

export default FloorPlanManager;
