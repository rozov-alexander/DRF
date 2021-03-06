import React from 'react';
import './App.css';
import UserList from './components/Users.js';
import ProjectList from './components/Project.js';
import NotesList from './components/Notes.js';
import ProjectInfo from './components/ProjectInfo.js';
import LoginForm from './components/Auth.js';
import axios from 'axios';
import {BrowserRouter, Route, Routes, Link, useLocation, Navigate} from 'react-router-dom';


const NotFound = () => {
    let location = useLocation()
    return (
        <div> Page {location.pathname} not found </div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'project': [],
            'notes': [],
            'token': '',
        }
    }

    load_data () {
        let headers = this.getHeader()

        axios
            .get('http://127.0.0.1:8000/api/CustomUser', {headers})
            .then(response => {
                const users = response.data.results
                    this.setState(
                        {
                            'users': users
                        }
                    )
            }).catch(error => {
                console.log(error)
                this.setState({
                    'users': []
                })
            })
        axios
            .get('http://127.0.0.1:8000/api/Project', {headers})
            .then(response => {
                const project = response.data.results
                    this.setState(
                        {
                            'project': project
                        }
                    )
            }).catch(error => {
                console.log(error)
                this.setState({
                    'project': []
                })
            })
        axios
            .get('http://127.0.0.1:8000/api/Notes', {headers})
            .then(response => {
                const notes = response.data.results
                    this.setState(
                        {
                            'notes': notes
                        }
                    )
            }).catch(error => {
                console.log(error)
                this.setState({
                    'notes': []
                })
            })
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        let login = localStorage.getItem('login')

        this.setState({
            'token': token,
            'login': login
        }, this.load_data)
    }

    isAuth() {
        return this.state.token != ''
    }

    getHeader() {
        if (this.isAuth()) {
            return {
                'Authorization': 'Token ' + this.state.token
            }
        }
        return []
    }


    get_token(login, password) {
        axios
        .post('http://127.0.0.1:8000/api-token-auth/', {'username': login, 'password': password})
        .then(response => {
            const token = response.data.token
            console.log(token)
            localStorage.setItem('token', token)
            localStorage.setItem('login', login)
            this.setState({
                'token': token,
                'login': login,
            }, this.load_data)
        }).catch(error => alert('?????????????????? ?????????? ?????? ????????????')) }
    
    logout() {
        localStorage.setItem('token', '')
        localStorage.setItem('login', '')
        this.setState({
            'token': '',
            'login': '',
        }, this.load_data)
    }

    render () {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <li><Link to='/'>Users</Link></li>
                        <li><Link to='/project'>Project</Link></li>
                        <li><Link to='/notes'>Notes</Link></li>
                        <li>
                            { this.isAuth() ? <button onClick={()=>this.logout()}>{this.state.login}/Logout</button> : <Link to='/login'>Login</Link> }
                        </li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element = {<UserList users={this.state.users} />} />
                        <Route exact path='/login' element = {<LoginForm  get_token={(login, password) => this.get_token(login, password)} />} />
                        <Route exact path='/project' element = {<ProjectList project={this.state.project} />} />
                        <Route exact path='/notes' element = {<NotesList notes={this.state.notes} />} />
                        <Route exact path='/users' element = {<Navigate to='/' />} />
                        <Route path='/project/:id' element = {<ProjectInfo notes={this.state.notes} />} />
                        <Route path="*" element = {<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
