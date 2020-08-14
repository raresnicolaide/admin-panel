import React from 'react';
import UserList from './components/UserList';
import UserAddForm from './components/UserAddForm';
import './App.css';
import PostList from './components/PostList';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      background: 'white',
      textColor: 'black',
      users: [],
      toggleUsers: true,
      togglePosts: false
      };
  }

  componentDidMount() {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/photos')
    ])
      .then(async([res1,res2]) => {
        const response1 = await res1.json();
        const response2 = await res2.json();
        return [response1, response2]; 
      })
      .then(value => {
        let users = value[0];
        value[1] = value[1].filter(pic => pic.id < 10);
        const url = value[1].map(pic => pic.thumbnailUrl)
        users = users.filter(user => user.id < 10);
        users.forEach((user,index) => {
          user.isGoldClient = false;
          user.salary = Math.floor(Math.random() * 10000);
          user.url = url[index];
        })
        
        this.setState({ users }); 
      })
  }

  changeColor(event) {
    this.setState({background: event.target.value});
  }

  changeTextColor(event) {
    this.setState({textColor: event.target.value})
  }

  getMaxId(users) {
    let maxId = 0;

    users.forEach(user => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });

    return maxId;
  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  submitAddForm(event, name, email, isGoldClient) {
    event.preventDefault();
    if(this.validateEmail(email) && name !== ''){
      name = this.capitalize(name);
      this.setState(prevState => {
        return {
          users: [
            ...prevState.users,
            {
              id: this.getMaxId(prevState.users) + 1,
              name,
              email,
              isGoldClient
            }
          ]
        }
      });
    }
    else 
      alert('Nume sau email invalid!');
    
  }
  showUsers() {
    this.setState({toggleUsers: !this.state.toggleUsers })
  }

  showPosts() {
    this.setState({togglePosts: !this.state.togglePosts })
  }

  deleteUser = (id) => {
    const newUsers = this.state.users.filter(user => user.id !== id)
    this.setState({users: newUsers})
  }
    


  render() {
    return(
      <div className='wholeApp'>
        <div className='navbar'>
          <h1>Admin panel Proiectul 1</h1>
          <UserAddForm submitAddForm={(event, name, email, isGoldClient, ) => this.submitAddForm(event, name, email, isGoldClient)}/>
          <div className='colorChange'>
            <input type="color" onChange={(event) => this.changeColor(event)}/>
            <input type="color" onChange={(event) => this.changeTextColor(event)}/>
          </div>
        </div>
        <div className="app" style={{ background: this.state.background, color:this.state.textColor }}>

          <div className='showButtons'>

            <Button
                          className='userButton'
                          style={{backgroundColor: 'rgba(83,16,110,1)', color: 'white'}}
                          variant="contained"
                          startIcon={<AccountBoxIcon />}
                          onClick={() => this.showUsers()}
                      >
                          Arata useri
            </Button>
            <Button
                          style={{backgroundColor: 'rgba(83,16,110,1)', color: 'white'}}
                          variant="contained"
                          startIcon={<EmailIcon />}
                          onClick={() => this.showPosts()}
                      >
                          Arata postari
            </Button>
          </div>
          {
            this.state.toggleUsers 
              ? <UserList users={this.state.users} deleteUser={(id) => this.deleteUser(id)}/>
              : null
          }

          {
            this.state.togglePosts 
              ? <PostList />
              : null
          } 

          

        </div>
      </div>
    );
  }
}

export default App;
