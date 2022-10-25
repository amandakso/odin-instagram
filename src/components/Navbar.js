import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../firebase/firebase.config";
import logo from "../assets/panda-insta.png";
import account from "../assets/account.png";
import cog from "../assets/cog.png";
import home from "../assets/home.png";
import search from "../assets/magnify.png";
import plus from "../assets/plus-box.png";
import logoutAccount from "../assets/logout-variant.png";
import SearchModal from "./SearchModal";
import "../styles/Navbar.css";

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    const [user, loading, error] = useAuthState(auth);
    const [searchClicked, setSearchClicked] = useState(false);
    const navigate = useNavigate();

    console.log(currentUser);

    const changeSearchClicked = () => {
        if (searchClicked) {
            setSearchClicked(false);            
        } else {
            setSearchClicked(true);
        }
    };

    useEffect(() => {
        if(loading) return;
        if(!currentUser) {
            navigate("/");
            return;
        }
    }, [currentUser, navigate, user, loading]);



    return (
        <nav className="nav">
            <ul className="nav-links left">
                <li><Link className="nav-link pandastagram" to="/"><img id="logo"src={logo} alt="Pandastagram Logo"/><span id="logoText">Pandastagram</span></Link></li>      
            </ul>
            <ul className="nav-links rightLinks">
                <li><img onClick={changeSearchClicked} className="nav-link" src={search} alt="search"/></li>
                <li><Link className="nav-link" to='/dashboard'><img src={home} alt="home"/></Link></li>
                <li><Link className="nav-link" to='/addPhoto'><img src={plus} alt="add"/></Link></li>
                { currentUser
                    ? <li><Link className="nav-link" to={`/users/${currentUser.displayName}`}><img src={account} alt="account"/></Link></li>
                    : <li><Link className="nav-link" to="/"><img src={account} alt="account"/></Link></li>
                }
                { currentUser && currentUser.uid !== 'qxsdhvfidBT6Tm8pdhGfNfqa63J2'
                    ? <li><Link className="nav-link" to="/settings"><img src={cog} alt="settings"/></Link></li>
                    : null
                }
                <li><img className="nav-link" onClick={logout} src={logoutAccount} alt="logout"/></li>
            </ul>
            { searchClicked
                ? <div><SearchModal onClick={changeSearchClicked}/></div>
                : null
            }
        </nav>
    );
};

export default Navbar;