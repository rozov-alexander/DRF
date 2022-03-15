import React from 'react';
import './App.css';
import UserList from './components/Users.js';
import ProjectList from './components/Project.js';
import NotesList from './components/Notes.js';
import ProjectInfo from './components/ProjectInfo.js';
import axios from 'axios'
import {BrowserRouter, Route, Routes, Link, useLocation, Navigate} from 'react-router-dom'


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
            'notes': []
        }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/CustomUser')
            .then(response => {
                const users = response.data.results
                    this.setState(
                        {
                            'users': users
                        }
                    )
            }).catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/api/Project')
            .then(response => {
                const project = response.data.results
                    this.setState(
                        {
                            'project': project
                        }
                    )
            }).catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/api/Notes')
            .then(response => {
                const notes = response.data.results
                    this.setState(
                        {
                            'notes': notes
                        }
                    )
            }).catch(error => console.log(error))
    }

    render () {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <li><Link to='/'>Users</Link></li>
                        <li><Link to='/project'>Project</Link></li>
                        <li><Link to='/notes'>Notes</Link></li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element = {<UserList users={this.state.users} />} />
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
