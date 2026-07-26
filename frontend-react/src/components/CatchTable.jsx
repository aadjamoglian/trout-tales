import { useState } from 'react';
import CatchRow from './CatchRow';

function CatchTable({catches, onEdit, onDelete}) {
    const [activeIndex, setActiveIndex] = useState();

    return (
        <table className="collection-container">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Species</th>
                    <th>Weight</th>
                    <th>Length</th>
                    <th>Bait</th>
                    <th>Story</th>
                    <th>Coordinates</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {catches.map((catchItem, i) => <CatchRow catchItem={catchItem} onEdit={onEdit} onDelete={onDelete} key={i} isActiveSection={i === activeIndex} setActiveIndex={setActiveIndex} activeIndex={activeIndex} sectionIndex={i}/>)}
            </tbody>
        </table>
    )
}

export default CatchTable;