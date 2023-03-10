import axios from "axios"
import {useNavigate} from 'react-router-dom';


export const TempLandingPage = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8000/user/logout");
        } catch (error) {
            console.error(error);
        }
        navigate('/login');
    };

    return (
        <div>
            <h1>WeWrap Home</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
