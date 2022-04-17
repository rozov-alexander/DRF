import { Link } from "react-router-dom"

const NoteItem = ({notes, deleteNote}) => {
    return (
        <tr>
            <td>
                {notes.project}
            </td>
            <td>
                {notes.body}
            </td>
            <td>
                {notes.user}
            </td> 
            <td>
                <button onClick={()=>deleteNote(notes.id)}type="button">Delete</button>
            </td>     
        </tr>
    )
}

const NotesList = ({notes, deleteNote}) => {
    return (
        <div class="main">
            <table>
                <th>
                    Project 
                </th>
                <th>
                    Body
                </th>
                <th>
                    User               
                </th>
                <th></th>
                {notes.map((notes) => <NoteItem notes={notes} deleteNote={deleteNote}/>)}
            </table>
            <Link to='/notes/create'>Create</Link>
            <div class="footer">
                <h4>Какой-то Footer. Все права не защищены!</h4>
            </div>
        </div>
    )
}

export default NotesList