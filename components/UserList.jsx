import React from 'react';
import UserItem from './UserItem';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import './UserList.css'

function UserList(props) {
    const { users } = props;
    console.log(props);
    return (
        <div className='UserList'>
            
            { users.map((user, index) => {
                return(
                <div className='item'>
                    <UserItem
                        id={ user.id }
                        name={ user.name }
                        email={ user.email }
                        salary={ user.salary }
                        url={ user.url }
                        isGoldClient={ user.isGoldClient }
                        key={ index }
                    />
                    <Button
                        className='deleteButton'
                        color='secondary'
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => props.deleteUser(user.id)}
                    >
                        Delete
                    </Button>
                </div>
                )

            })}
        </div>
    );
}

export default UserList;