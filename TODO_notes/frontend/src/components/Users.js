import React from 'react'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.email}
            </td>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <div class="main">
            <table>
                <th>
                    email 
                </th>
                <th>
                    username
                </th>
                <th>
                    First name
                </th>
                <th>
                    Last Name
                </th>
                {users.map((user) => <UserItem user={user} />)}
            </table>
            <div class="footer">
                <h4>Какой-то Footer. Все права не защищены!</h4>
            </div>
        </div>
    )
}

export default UserList