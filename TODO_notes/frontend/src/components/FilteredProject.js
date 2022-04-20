import React from "react";


class ProjectRow extends React.Component {
  render() {
    const project = this.props.project;
    return (
      <tr>
        <th>
            {project.name}
        </th>
        <th>
            {project.repo}
        </th>
        <th>
            {project.users}
        </th>
      </tr>
    );
  }
}

class ProjectTable extends React.Component {
  render() {
    const filterText = this.props.filterText;

    const rows = [];

    this.props.project.forEach((project) => {
        if (project.name.indexOf(filterText) === -1) {
            return
        }
     
        rows.push(
        <ProjectRow
          project={project}
          key={project.name}
        />
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Repo</th>
            <th>Users</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </form>
    );
  }
}

class FilteredProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <ProjectTable
          project={this.props.project}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}


export default FilteredProject



