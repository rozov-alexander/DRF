import React from 'react'
class NoteForm extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            'project': props.project[0].id,
            'users': props.users[0].id,
            body: ''
        } 
    }

    handleBodyChange(event) {
        this.setState( 
            {
                [event.target.name]: event.target.value 
            }
            ); 
        }

    handleProjectChange(event) {
        
        this.setState({
            'project': event.target.value
        })
    }

    handleUsersChange(event) {

        this.setState({
            'users': event.target.value
        })
    }
    
    handleSubmit(event) {
        this.props.createNote(this.state.project, this.state.users, this.state.body)
        console.log(this.state.project, this.state.users)
        event.preventDefault()
        }
        
    render() { 
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
            <input 
                type="text" 
                name="body" 
                placeholder="body" 
                onChange={(event)=>this.handleBodyChange(event)}
                value={this.state.body} />
            <select onChange={(event)=>this.handleProjectChange(event)}>
                {this.props.project.map((project) => <option value={project.id}>{project.name}</option>)}
            </select>
            <select onChange={(event)=>this.handleUsersChange(event)}>
                {this.props.users.map((users) => <option value={users.id}>{users.username}</option>)}
            </select>
            <input type="submit" value="Создать" />
            </form> 
            );
    }
}

export default NoteForm