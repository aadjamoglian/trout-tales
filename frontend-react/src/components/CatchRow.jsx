import '../App.css';
import { MdEdit, MdDelete } from "react-icons/md";
import Accordion from 'react-bootstrap/Accordion'

function CatchRow({ catchItem, onEdit, onDelete, isActiveSection, setActiveIndex, activeIndex, sectionIndex}) {

    let catchTitle = catchItem.story.slice(0, 10) + "..."

    const toggleSection = () => {
        const nextIndex = isActiveSection ? null : sectionIndex;
        setActiveIndex(nextIndex);
    }

    const rowNum = () => {
    let count = 1; // Hidden state
    return function() {
        return count++; // Increments after each call
    };
}

    return (
        <tr className="collection-item">
            <td>{catchItem.date?.split('T')[0]}</td>
            <td>{catchItem.species}</td>
            <td>{catchItem.weight}</td>
            <td>{catchItem.length_in}</td>
            <td>{catchItem.bait}</td>
            <td className="storyCell" onClick={toggleSection}>
                {!isActiveSection && <div className='leftStory'>{catchTitle}</div>}
                {isActiveSection && <div className='leftStory'>{catchItem.story}</div>}
                <div className='rightStory'>{isActiveSection ? "-" : "+"}</div>
            </td>
            <td>{catchItem.coordinates[0] + ", " + catchItem.coordinates[1]}</td>
            <td>
                <p>
                    <a className="actionLink" href="/" onClick={e => {e.preventDefault(); onEdit(catchItem)}}><MdEdit /></a>
                    <a className="actionLink" href="/" onClick={e => {e.preventDefault(); onDelete(catchItem._id)}}><MdDelete /></a>
                </p>
            </td>
        </tr>
    )

}

export default CatchRow;