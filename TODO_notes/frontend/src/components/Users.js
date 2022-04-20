import React from 'react'


const UserItem = ({user}) => {
    const isStaff = user.is_staff;
    const isSuperuser = user.is_superuser;
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
            { isStaff ? <td>{user.is_staff.toString()}</td> : ''}
            { isSuperuser ? <td>{user.is_superuser.toString()}</td> : ''}
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <div class="main">
            <table>
                <th>
                    username
                </th>
                <th>
                    First name
                </th>
                <th>
                    Last Name
                </th>
                <th>
                    email 
                </th>
                <th>
                    isStaff
                </th>
                <th>
                    isSuperuser
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