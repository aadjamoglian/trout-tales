import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UpdateCatchPage = ({catchItemToEdit}) => {

    console.log(catchItemToEdit);

    const [date, setDate] = useState(catchItemToEdit.date);
    const [species, setSpecies] = useState(catchItemToEdit.species);
    const [weight, setWeight] = useState(catchItemToEdit.weight);
    const [length_in, setLength_in] = useState(catchItemToEdit.length_in);
    const [bait, setBait] = useState(catchItemToEdit.bait);
    const [story, setStory] = useState(catchItemToEdit.story);
    const [coordinates, setCoordinates] = useState(catchItemToEdit.coordinates);
    // const [geoOption, setGeoOption] = useState('')

    const navigate = useNavigate();

    const editCatch = async () => {
        const editedCatch = {date, species, weight, length_in, bait, story, coordinates};
        const response = await fetch(
            `/catches/${catchItemToEdit._id}`, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(editedCatch)
            }
        );

        if (response.status === 200) {
            alert("Successfully updated the catch!");
        } else {
            alert("Failed to update the exercise, status code = " + response.status)
        }
        navigate('/')

    };

    return (
        <div>
            <h1 id="editedCatch">Edit Catch</h1>
            <p>
                <label htmlFor="date">Date: </label>
                <input 
                    name="date" 
                    type="text"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </p>
            <p>
                <label htmlFor="species">Species: </label>
                <input 
                    name="species" 
                    type="text"
                    value={species}
                    onChange={e => setSpecies(e.target.value)}
                />
            </p>
            <p>
                <label htmlFor="weight">Weight: </label>
                <input 
                    name="weight" 
                    type="text"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                />
            </p>
            <p>
                <label htmlFor="length_in">Length: </label>
                <input 
                    name="length_in" 
                    type="text"
                    value={length_in}
                    onChange={e => setLength_in(e.target.value)}
                />
            </p>
            <p>
                <label htmlFor="bait">Bait: </label>
                <input 
                    name="bait" 
                    type="text"
                    value={bait}
                    onChange={e => setBait(e.target.value)}
                />
            </p>
            <p>
                <label htmlFor="story">Story: </label>
                <input 
                    name="story" 
                    type="text"
                    value={story}
                    onChange={e => setStory(e.target.value)}
                />
            </p>
            <p>
                <label htmlFor="coordinates">Coordinates: </label>
                <input 
                    name="coordinates" 
                    type="text"
                    value={coordinates}
                    onChange={e => setCoordinates(e.target.value)}
                    // disabled={geoOption === 'cityStateCountry'}
                />
            </p>
            <button onClick={editCatch}>Update</button>
        </div>
    )
    
}

export default UpdateCatchPage;