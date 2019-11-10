import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class ProjectsList extends Component {
   constructor () {
    super(); 
    
   }
    
  state = {
    Projects: [],
    newProjectData: {
        project_name: '',
        project_description: '',
        completed: ''
    },
    editProjectData: {
        id: '',
        project_name: '',
        project_description: '',
        completed: ''
    },
    newProjectModal: false,
    editProjectModal: false
  }
 componentWillMount() {
   this._refreshProjects();
 }

  toggleNewProjectModal() {
    this.setState({
      newProjectModal: ! this.state.newProjectModal
    });
  }
  toggleEditProjectModal() {
    this.setState({
      editProjectModal: ! this.state.editProjectModal
    });
  }
  addProject() {
    axios.post('http://localhost:4000/api/projects', this.state.newProjectData).then((response) => {
      let { Projects } = this.state;

      Projects.push(response.data);

      this.setState({ Projects, newProjectModal: false, newProjectData: {
        project_name: '',
        project_description: '',
        completed: ''
      }})      
   })
   .catch(error => {
    console.log(error)
    })
  }
  updateProject() {
    let {project_name,project_description,completed } = this.state.editProjectData;
    axios.put('http://localhost:4000/api/projects/' + this.state.editProjectData.id, {
    project_name,project_description,completed
    })
    .then((response) => {
      this._refreshProjects();

      this.setState({
        editProjectModal: false, editProjectData: { id: '',project_name: '', project_description: '', completed: '' }
      })      
    })
    .catch(error => {
      console.log(error);
     
    });
  }
  editProject(id, project_name,project_description,completed) {
    this.setState({
      editProjectData: { id, project_name,project_description,completed }, editProjectModal: ! this.state.editProjectModal
    });
  }
 
  deleteProject(id) {
    
    axios.delete('http://localhost:4000/api/projects/' + id)
      .then((response) => {
      this._refreshProjects();
      })
     .catch(error => {
      console.log(error);
    });
  }

  _refreshProjects() {      
		axios.get('http://localhost:4000/api/projects/')
    .then(response => {
      this.setState({
        Projects: response.data
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  
  render() {
    
    
    let Projects = this.state.Projects.map((Project) => {
      return (
        <tr key={Project.id}>   
         <td>{Project.id}</td>    
        <td>{Project.project_name}</td>
        <td>{Project.project_description}</td>
        <td>{Project.completed}</td>
                
         <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editProject.bind(this, Project.id, Project.project_name, Project.project_description, Project.completed )}>Edit Project</Button>
            <Button color="danger" size="sm" onClick={this.deleteProject.bind(this, Project.id)}>Delete Project</Button> {' '}
            {/*<Link to ={`/projectsactionslist/${Project.id}`} >  <Button color="success" size="sm" className="mr-2">Project Actions</Button> </Link>*/}
          </td>
        </tr>
      )
    });
    return (
      <div className="projects-Container">

      <h1>Scheduled Projects</h1>
      
      {'   '}<Button className="my-3" color="primary" onClick={this.toggleNewProjectModal.bind(this)}>Add Project</Button>

      <Modal isOpen={this.state.newProjectModal} toggle={this.toggleNewProjectModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewProjectModal.bind(this)}>Add a new Project</ModalHeader>
        <ModalBody>
            
            {/* Add New Project Data */}  
            
            {/* Project Title */}

          <FormGroup>
            <Label for="ProjectName">Project Name</Label>
            <Input id="ProjectName" value={this.state.newProjectData.project_name} onChange={(e) => {
              let { newProjectData } = this.state;

              newProjectData.project_name = e.target.value;

              this.setState({ newProjectData });
            }} />
          </FormGroup>

            {/* Project Description */}

          <FormGroup>
            <Label for="ProjectDescription">Project Description</Label>
            <Input id="ProjectDescription" value={this.state.newProjectData.rating} onChange={(e) => {
              let { newProjectData } = this.state;

              newProjectData.project_description = e.target.value;

              this.setState({ newProjectData });
            }} />
          </FormGroup>
              
        {/* completed */} 

        <FormGroup>

            

            {/*<Label for="completed"> Completed:</Label>*/}
             <Input id="completed" type='hidden' value={false} onChange={(e) => {
              let { newProjectData } = this.state;

              newProjectData.completed = e.target.value;

              this.setState({ newProjectData });
            }} />
        

          </FormGroup>       


        </ModalBody>
        
        <ModalFooter>

          <Button color="primary" onClick={this.addProject.bind(this)}>Add Project</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewProjectModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editProjectModal} toggle={this.toggleEditProjectModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditProjectModal.bind(this)}>Edit/Preview Project Details</ModalHeader>
        <ModalBody>
          
          {/* Edit Project Data */}  
          
          {/* project_name */} 

          <FormGroup>
          
            <Label for="project_name">Project Name</Label>
            <Input id="project_name" value={this.state.editProjectData.project_name} onChange={(e) => {
              let { editProjectData } = this.state;

              editProjectData.project_name = e.target.value;

              this.setState({ editProjectData });
            }} />
          </FormGroup>

          {/* project_description */}

          <FormGroup>
            <Label for="project_description">Project Description</Label>
            <Input id="project_description" value={this.state.editProjectData.project_description} onChange={(e) => {
              let { editProjectData } = this.state;

              editProjectData.project_description = e.target.value;

              this.setState({ editProjectData });
            }} />
          </FormGroup>       
          
          {/* completed */}

          <FormGroup>
            <Label for="completed">Completed</Label>{' '}
            <Input id="completed" value={this.state.editProjectData.completed} onChange={(e) => {
              let { editProjectData } = this.state;

              editProjectData.completed = e.target.value;

              this.setState({ editProjectData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateProject.bind(this)}>Update Project</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditProjectModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table className='theProjects'>
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>completed</th>
			  <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {Projects}
          </tbody>
        </Table>
       

      </div>
    );
  }
}

export default ProjectsList;
