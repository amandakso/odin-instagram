import React, { useState, useEffect }from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, updateName, updateUsername } from "../firebase/firebase.config";
import Navbar from "./Navbar";
import ProfilePhoto from "./ProfilePhoto";
import "../styles/Settings.css";

const Settings = () => {
    const [user, loading, error] = useAuthState(auth);
    const [page, setPage] = useState(<div></div>);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        if(loading) {
            setPage(<div>Loading...</div>);
        } else if (user) {
            setPage(
                <div>
                    <Navbar />
                    <div className="settings">
                        <h3>Change Profile Name</h3>
                        <input 
                            type="text"
                            className="settings_textBox"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter New Name"
                        />
                        <button onClick={()=> updateName(user.uid, name)}>Change Name</button>
                        <h3>Change Username</h3>
                        <input
                            type="text"
                            className="settings_textBox"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter New Username"
                        />
                        <button onClick={()=> updateUsername(user.uid, username)}>Change Username</button>
                        <h3>Change Profile Photo</h3>
                        <div className="profile-photo">
                                <ProfilePhoto user={user}/>
                        </div>
                    </div>
                </div>
            )
        } else if (error) {
            setPage(<div>Error...</div>)
        } else {
            navigate("/logout");
            return;
        }
    }, [ name, username, navigate, loading, user, error]);

    return (
        <div>
            {page}
        </div>
    )
}

export default Settings