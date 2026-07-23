import { Link } from 'react-router-dom';
import CatchTable from '../components/CatchTable';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function CatchesPage({setCatchItemToEdit}) {
    const [catches, setCatches] = useState([])
    const navigate = useNavigate();

    const loadCatches = async () => {
        const response = await fetch('/catches');
        const data = await response.json();
        setCatches(data);
    }

    useEffect( () => {
        loadCatches();
    }, []);

    const onDelete = async (_id) => {
        const response = await fetch (
            `/catches/${_id}`,
            {method: 'DELETE'}
        );

        if (response.status === 204) {
            setCatches(catches.filter((catchItem) => catchItem._id !== _id))
        } else {
            alert(`Failed to delete the movie with _id = ${_id}, status code = ${response.status}`)
        }
    }

    const onEdit = (catchItem) => {
        setCatchItemToEdit(catchItem)
        navigate('/update');
    }

    return (
        <>
            <h2>List of Catches</h2>
            <CatchTable catches={catches} onEdit={onEdit} onDelete={onDelete}></CatchTable>
            <Link to="/log-catch"></Link>
        </>
    )

}

export default CatchesPage;