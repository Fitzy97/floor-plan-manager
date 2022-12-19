import React  from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

/**
 * Component for the page where the user can view a specific floor plan.
 * Displays the layout with height, width of floor, and individual rooms
 * and their doors, heights and widths.
 */
function ViewerPage() {

    const baseClass = 'viewer-page';
    const { state } = useLocation();
    const {
        title,
        height,
        width,
        room_length,
    } = state;

    const numRoomsWide = width / room_length;
    const numRoomsLong = height / room_length;

    const getFloorPlan = () => {
        const floorPlan = [];

        if (numRoomsWide === 1 && numRoomsLong === 1) {
            const row = [<Room doors={[]} />];
            floorPlan.push(row);
            return floorPlan;
        }

        for (let i = 0; i < numRoomsLong; i++) {
            const row = [];
            for (let j = 0; j < numRoomsWide; j++) {
                let doors;
                if (numRoomsWide === 1) {
                    if (i === 0) {
                        doors = ['bottom'];
                    } else if (i === numRoomsLong-1) {
                        doors = ['top'];
                    } else {
                        doors = ['top', 'bottom'];
                    }
                }
                else {
                    if (i === 0 && j === 0) {
                        doors = ['right'];
                    } else if (i === numRoomsLong - 1 && j === numRoomsWide - 1 && i % 2 === 0) {
                        doors = ['left'];
                    } else if (j === 0 && i === numRoomsLong - 1 && i % 2 === 1) {
                        doors = ['right'];
                    } else if (j === 0 && i % 2 === 0) {
                        doors = ['top', 'right'];
                    } else if (j === 0 && i % 2 === 1) {
                        doors = ['right', 'bottom'];
                    } else if (j === numRoomsWide - 1 && i % 2 === 0) {
                        doors = ['left', 'bottom'];
                    } else if (j === numRoomsWide - 1 && i % 2 === 1) {
                        doors = ['top', 'left'];
                    } else {
                        doors = ['left', 'right'];
                    }
                }
                row.push(<Room doors={doors} />);
            }
            floorPlan.push(row);
        }

        return floorPlan;
    }

    return (
        <div className={baseClass}>
            <div className={`${baseClass}-floorplan-wrapper`}>
                <span className={`${baseClass}-title`}>Title: {title}</span>
                <span className={`${baseClass}-height`}>Height: {height}'</span>
                <span className={`${baseClass}-width`}>Width: {width}'</span>
                <span className={`${baseClass}-roomlength`}>Room length/height: {room_length}'</span>
                <div className={`${baseClass}-floorplan`}>
                    {getFloorPlan().map((row) =>
                        <div className={`${baseClass}-row`}>
                            {row.map((room) => React.cloneElement(room))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function Room({ doors }) {
    const baseClass = 'viewer-page';
    return (
        <div className={`${baseClass}-room`}>
            {doors.map((door) => <div className={`${baseClass}-${door}`}></div>)}
        </div>
    );
}

Room.propTypes = {
    /**
     * The doors that this room has ['top', 'right', 'bottom', 'left']
     */
    doors: PropTypes.arrayOf(PropTypes.string),
}

export default ViewerPage;
