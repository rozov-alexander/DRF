import React from 'react'
import {Link} from 'react-router-dom'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`/project/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                {project.repo}
            </td>
            <td>
                {project.users}
            </td>      
        </tr>
    )
}

const ProjectList = ({project}) => {
    return (
        <div class="main">
            <table>
                <th>
                    Name 
                </th>
                <th>
                    Repo
                </th>
                <th>
                    Users                
                </th>
                {project.map((project) => <ProjectItem project={project} />)}
            </table>
            <div class="footer">
                <h4>Какой-то Footer. Все права не защищены!</h4>
            </div>
        </div>
    )
}

export default ProjectList