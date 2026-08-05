import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CatchTable from '../components/CatchTable';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function CatchesPage({setCatchItemToEdit}) {
    const [catches, setCatches] = useState([])
    const [query, setQuery] = useState('')
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
        const isConfirmed = window.confirm("Are you sure you want to delete this catch?")

        if (isConfirmed) {
            const response = await fetch (
                `/catches/${_id}`,
                {method: 'DELETE'}
            );

            if (response.status === 204) {
                setCatches(catches.filter((catchItem) => catchItem._id !== _id))
            } else {
                alert(`Failed to delete the catch with _id = ${_id}, status code = ${response.status}`)
            }
        }


    }

    const onEdit = (catchItem) => {
        setCatchItemToEdit(catchItem)
        navigate('/update');
    }

    const onSearch = async (query) => {
        if (event.key === '')

        console.log("Searched: " + query)
        try {

            const response = await fetch(
                `/search?search=${query}`
            );

            const data = await response.json();
            setCatches(data);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <SearchBar query={query} setQuery={setQuery} onSearch={onSearch}></SearchBar>
            <h2>List of Catches</h2>
            <CatchTable catches={catches} onEdit={onEdit} onDelete={onDelete}></CatchTable>
            <Link to="/log-catch">Log A Catch</Link>
        </>
    )

}

export default CatchesPage;