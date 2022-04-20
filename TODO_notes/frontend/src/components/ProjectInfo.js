import {useParams} from 'react-router-dom'


const NotesItem = ({notes}) => {
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
        </tr>
    )
}


const ProjectInfo = ({notes}) => {
    var {id} = useParams()
    var filteredNotes = notes.filter((notes) => notes.project == id)

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
                {filteredNotes.map((notes) => <NotesItem notes={notes} />)}
            </table>
            <div class="footer">
                <h4>Какой-то Footer. Все права не защищены!</h4>
            </div>
        </div>
    )
}

export default ProjectInfo