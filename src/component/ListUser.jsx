import axios from "axios";
import { useEffect, useState } from "react";

const ListUser = ({ users, userSelect, userDelte }) => {


    return (
        <ul className="list-main">
            {
                users.map(user => (
                    <li id={user.id} key={user.id} className="item-list">
                        <h3>{user.first_name} {user.last_name}</h3> 
                        <hr />
                        <p><span className="material-symbols-outlined">alternate_email</span>{user.email}</p>
                        <p><span className="material-symbols-outlined">cake</span>{user.birthday}</p> 
                        <button onClick={() => userDelte(user.id)} className="material-symbols-outlined">delete</button>
                        <button onClick={() => userSelect(user)} className="material-symbols-outlined">edit</button>
                    </li>
                ))
            }
        </ul>
    );
};

export default ListUser;