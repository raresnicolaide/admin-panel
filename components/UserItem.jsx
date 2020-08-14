import React from 'react';
import './UserItem';
function UserItem(props) {
    const {name, email, isGoldClient, url, salary} = props;

    return (
        <div>
            <p><strong>{ name }</strong></p>
            <p>{ email }</p>
            <p>${ salary } </p>
            <img src={url} alt='user'/>
            { isGoldClient
                ? <h3>Client GOLD</h3>
                : null
            }
        </div>
    );
}

export default UserItem;