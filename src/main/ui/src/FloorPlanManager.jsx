import React from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

import './App.css';
import LoginPage from "./login-page/LoginPage";
import ListingPage from "./listing-page/ListingPage";
import CreatorPage from "./creator-page/CreatorPage";
import ViewerPage from "./viewer-page/ViewerPage";

/**
 * Wrapper component for application.  Instantiates the router and routes for
 * each page: {@link LoginPage}, {@link ListingPage}, {@link CreatorPage}, and {@link ViewerPage}
 *
 * Note that unrecognized routes will re-route to the login page.
 */
function FloorPlanManager({ baseClass }) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/listing/:userId" element={<ListingPage />} />
                <Route path="/creator/:userId" element={<CreatorPage />} />
                <Route path="/viewer/:floorPlanId" element={<ViewerPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
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
