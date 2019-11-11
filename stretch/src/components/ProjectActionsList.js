import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class ProjectActionsList extends Component {
   constructor (props) {
    super(props); 
    const { project_id } = this.props.match.params
    this.project_id = project_id;
   }
    

  state = {
    Actions: [],
    newActionData: {
        project_id: '',
        description: '',
        notes: '',
        completed: ''
    },
    editActionData: {
        id: '',
        project_id: '',
        description: '',
        notes: '',
        completed: ''
    },
    newActionModal: false,
    editActionModal: false
  }
 componentWillMount() {
   this._refreshActions();
 }

  toggleNewActionModal() {
    this.setState({
      newActionModal: ! this.state.newActionModal
    });
  }
  toggleEditActionModal() {
    this.setState({
      editActionModal: ! this.state.editActionModal
    });
  }
  addAction() {
    axios.post(`http://localhost:4000/api/projects/${this.project_id}/actions/`, this.state.newActionData).then((response) => {
      let { Actions } = this.state;

      Actions.push(response.data);

      this.setState({ Actions, newActionModal: false, newActionData: {
        project_id: '',
        description: '',
        notes: '',
        completed: ''
            }})      
   })
   .catch(error => {
    console.log(error)
    })
  }
  updateAction() {
    let {description,notes, completed } = this.state.editActionData;
    axios.put(`http://localhost:4000/api/projects/${this.project_id}/actions/` + this.state.editActionData.id, {
    description,notes,completed
    })
    .then((response) => {
      this._refreshActions();

      this.setState({
        editActionModal: false, editActionData: { id: '', description: '',notes: '', completed: '' }
      })      
    })
    .catch(error => {
      console.log(error);
     
    });
  }
  editAction(id, description,notes,completed) {
    this.setState({
      editActionData: { id, description,notes,completed }, editActionModal: ! this.state.editActionModal
    });
  }
 
  deleteAction(id) {
    
    axios.delete(`http://localhost:4000/api/projects/${this.project_id}/actions/` + id)
      .then((response) => {
      this._refreshActions();
      })
     .catch(error => {
      console.log(error);
    });
  }

  _refreshActions() {      
		axios.get(`http://localhost:4000/api/projects/${this.project_id}/actions`)
    .then(response => {
      this.setState({
        Actions: response.data
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  
  render() {
    
    
    
    let Actions = this.state.Actions.map((Action) => {

      let comp = "No";

    if(Action.completed) {
      comp = "Yes";
    } else {

      comp = "No";

    }

      return (
        <tr key={Action.id}>   
         <td>{Action.id}</td>    
       <td>{Action.description}</td>
       <td>{Action.notes}</td>
        <td>{comp}</td>
                
         <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editAction.bind(this, Action.id, Action.description, Action.notes, Action.completed )}>Edit Action</Button>
            <Button color="danger" size="sm" onClick={this.deleteAction.bind(this, Action.id)}>Delete Action</Button> {' '}
            </td>
        </tr>
      )
    });
    return (
      <div className="actions-Container">

      <h1>Actions</h1>
      
      {'   '}<Button className="my-3" color="primary" onClick={this.toggleNewActionModal.bind(this)}>Add Action</Button>
      <Link to={`/`}>  <Button color="primary" size="sm" className="mr-2">Back to Projects</Button> </Link>
      <Modal isOpen={this.state.newActionModal} toggle={this.toggleNewActionModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewActionModal.bind(this)}>Add a new Action</ModalHeader>
        <ModalBody>
            
            {/* Add New Action Data */}  
            
            {/* Action Description */}

          <FormGroup>
            <Label for="ActionDescription">Action Description</Label>
            <Input id="ActionDescription" value={this.state.newActionData.description} onChange={(e) => {
              let { newActionData } = this.state;

              newActionData.description = e.target.value;

              this.setState({ newActionData });
            }} />
          </FormGroup>

            {/* Action Notes */}

          <FormGroup>
            <Label for="ActionNotes">Action Notes</Label>
            <Input id="ActionNotes" value={this.state.newActionData.notes} onChange={(e) => {
              let { newActionData } = this.state;

              newActionData.notes = e.target.value;

              this.setState({ newActionData });
            }} />
          </FormGroup>
              
        {/* completed */} 

        <FormGroup>

            

            {/*<Label for="completed"> Completed:</Label>*/}
             <Input id="completed" type='hidden' value={false} onChange={(e) => {
              let { newActionData } = this.state;

              newActionData.completed = e.target.value;

              this.setState({ newActionData });
            }} />
        

          </FormGroup>       


        </ModalBody>
        
        <ModalFooter>

          <Button color="primary" onClick={this.addAction.bind(this)}>Add Action</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewActionModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editActionModal} toggle={this.toggleEditActionModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditActionModal.bind(this)}>Edit/Preview Action Details</ModalHeader>
        <ModalBody>
          
          {/* Edit Action Data */}  
          
          {/* Action Descrption */} 

          <FormGroup>
          
            <Label for="action_description">Action Description</Label>
            <Input id="action_description" value={this.state.editActionData.description} onChange={(e) => {
              let { editActionData } = this.state;

              editActionData.description = e.target.value;

              this.setState({ editActionData });
            }} />
          </FormGroup>

          {/* Action Notes */}

          <FormGroup>
            <Label for="action_notes">Action Notes</Label>
            <Input id="action_notes" value={this.state.editActionData.notes} onChange={(e) => {
              let { editActionData } = this.state;

              editActionData.notes = e.target.value;

              this.setState({ editActionData });
            }} />
          </FormGroup>       
          
          {/* completed */}

          <FormGroup>
            <Label for="completed"></Label>{' '}
            <Input id="completed" type="hidden" value={this.state.editActionData.completed} onChange={(e) => {
              let { editActionData } = this.state;

              editActionData.completed = e.target.value;

              this.setState({ editActionData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateAction.bind(this)}>Update Action</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditActionModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table className='theActions'>
          <thead>
            <tr>
              <th>#</th>
              <th>Action Description</th>
              <th>Action Notes</th>
              <th>completed</th>
			        <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {Actions}
          </tbody>
        </Table>
       

      </div>
    );
  }
}

export default ProjectActionsList;
