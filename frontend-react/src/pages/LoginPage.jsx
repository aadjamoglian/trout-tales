import { Link } from 'react-router-dom';
import CatchTable from '../components/CatchTable';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [validLogin, setValidLogin] = useState(false);

    const validResponseUsername = 'adjamoglian';
    const validResponsePassword = 'password123';

    const validateUser = async (event) => {
        event.preventDefault();

        if (username === validResponseUsername && password === validResponsePassword) {
            navigate('/catches')
        } else {
            alert('Incorrect username or password! Try again.')
        }
    }


    return (
        <>
            <form onSubmit={validateUser}>
                <fieldset>
                    <legend>Login:</legend>
                    <p>
                        <label htmlFor="username">Username: </label>
                        <input 
                            name="username" 
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </p>
                    <p>
                        <label htmlFor="Password">Password: </label>
                        <input 
                            name="password" 
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </p>
                    <div>
                        <input className="loginAndRegister" type="submit" id="submit" value="Login"/>
                        <input className="loginAndRegister" type="submit" id="submit" value="Register"/>
                    </div>

                </fieldset>
            </form>
        </>
    );

}

export default LoginPage;