import React from 'react';
import './UserAddForm.css';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

class UserAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            isGoldClient: false
        };
    }
    
    updateName(event) {
        this.setState({name: event.target.value});
    }

    updateEmail(event) {
        this.setState({email: event.target.value});    
    }

    updateIsGoldClient(event) {
        this.setState({isGoldClient: event.target.checked});
    }

    render() {
        const {name, email, isGoldClient} = this.state;

        return (
            <form
                className="user-add-form"
                onSubmit={(event) => this.props.submitAddForm(event, name, email, isGoldClient)}
            >
                <h2>Adauga utilizatori:</h2>
                <label htmlFor="name">Nume:</label>
                <input
                    type="text"
                    name="name"
                    onChange={(event) => this.updateName(event)}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    name="email"
                    onChange={(event) => this.updateEmail(event)}
                />
                <label htmlFor="is-gold-client">Client GOLD</label>
                <input
                    type="checkbox"
                    name="is-gold-client"
                    value="true"
                    onChange={(event) => this.updateIsGoldClient(event)}
                />
                <Button
                          type={'submit'}
                          style={{backgroundColor: 'rgba(83,16,110,1)', color: 'white',width:'70%', height: '40px'  }}
                          variant="contained"
                          startIcon={<PersonAddIcon />}
                          
                      >
                          Add user
                </Button>
            </form>
        )
    }
}

export default UserAddForm;