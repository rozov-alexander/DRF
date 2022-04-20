import React from 'react'
import {Link} from 'react-router-dom'



const ProjectItem = ({project, deleteProject}) => {
    
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
            <td>
                <button onClick={()=>deleteProject(project.id)}type='button'>Delete</button>
            </td>      
        </tr>
    )
}

const ProjectList = ({project, deleteProject}) => {

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
                <th></th>
                {project.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
            <Link to='/project/create'>Create</Link><br/>
            <Link to='/project/search'>Search</Link>
            <div class="footer">
                <h4>Какой-то Footer. Все права не защищены!</h4>
            </div>
        </div>
    )
}

export default ProjectList