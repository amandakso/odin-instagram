import React, { useEffect, useState }from "react";
import close from "../assets/close-circle.png";
import Users from "./Users";
import "../styles/Users.css";
import { getAllUsers } from "../firebase/firebase.config";
import alphabetizeUsernames from "./Alphabetize";

const SearchModal = (props) => {
    const [search, setSearch] = useState("");
    const [allUsers, setAllUsers] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    const searchUsers = async() => {
        if(!allUsers) {
            try {
                let userData = await getAllUsers();
                setAllUsers(userData);
                console.log(userData);
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        } else {
            return;
        }
    }

    const filterUsers = (search) => {
        let filtered = [];
        let searchLowered = search.toLowerCase();
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].name.toLowerCase().startsWith(searchLowered) || (allUsers[i].displayName.toLowerCase().startsWith(searchLowered))) {
                filtered = filtered.concat(allUsers[i])
            };
        }
        filtered = alphabetizeUsernames(filtered);
        setSearchResults(<Users accounts={filtered} update={props.onClick} userType={"search"}/>)
        
    }

    return (
        <div className="search modal">
            <img className="close" onClick={props.onClick} src={close} alt="close"/>
            <input
                type="text"
                className="search_textBox"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => searchUsers()}
                onKeyUp={() => filterUsers(search)}
                placeholder="Search..."
            />
            {searchResults}
        </div>

    )

}

export default SearchModal;