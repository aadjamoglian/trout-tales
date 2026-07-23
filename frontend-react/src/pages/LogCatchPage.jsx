import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LogCatchPage = () => {

    const [date, setDate] = useState('');
    const [species, setSpecies] = useState('');
    const [weight, setWeight] = useState('');
    const [length_in, setLength_in] = useState('');
    const [bait, setBait] = useState('');
    const [story, setStory] = useState('');
    const [coordinates, setCoordinates] = useState('');

    const navigate = useNavigate();

    const logCatch = async (event) => {
        event.preventDefault();

        const newCatchItem = {date, species, weight, length_in, bait, story, coordinates}
        console.log(newCatchItem);
        const response = await fetch(
            '/catches', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(newCatchItem)
            }
        );

        if (response.status === 201) {
            alert("Successfully logged the catch!")
        } else {
            alert("Failed to log the catch, status code = " + response.status)
        }
        navigate('/')

    };

    return (
        <>
            <form onSubmit={logCatch}>
                <fieldset>
                    <legend>Catch Info:</legend>
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
                            value={coordinates}
                            onChange={e => {
                                const latLong = e.target.value.split(',').map(Number);
                                console.log(latLong);
                                setCoordinates(latLong);
                            }}
                        />
                    </p>
                    <input type="submit" id="submit" value="Add"/>
                </fieldset>
            </form>
        </>
    );

}

export default LogCatchPage;