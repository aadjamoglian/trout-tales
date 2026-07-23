import '../App.css';
import { MdEdit, MdDelete } from "react-icons/md";

function CatchRow({ catchItem, onEdit, onDelete}) {

    return (
        <tr className="collection-item">
            <td>{catchItem.date?.split('T')[0]}</td>
            <td>{catchItem.species}</td>
            <td>{catchItem.weight}</td>
            <td>{catchItem.length_in}</td>
            <td>{catchItem.bait}</td>
            <td>{catchItem.story}</td>
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