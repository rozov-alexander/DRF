const NoteItem = ({notes}) => {
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

const NotesList = ({notes}) => {
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
                {notes.map((notes) => <NoteItem notes={notes} />)}
            </table>
            <div class="footer">
                <h4>Какой-то Footer. Все права не защищены!</h4>
            </div>
        </div>
    )
}

export default NotesList