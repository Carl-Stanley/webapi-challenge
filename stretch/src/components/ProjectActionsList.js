import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class ActionsActionsList extends Component {
   constructor () {
    super(); 
    
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
    axios.post('http://localhost:4000/api/actions', this.state.newActionData).then((response) => {
      let { Actions } = this.state;

      Actions.push(response.data);

      this.setState({ Actions, newActionModal: false, newActionData: {
        name: '',
        description: '',
        completed: ''
      }})      
   })
   .catch(error => {
    console.log(error)
    })
  }
  updateAction() {
    let {name,description,completed } = this.state.editActionData;
    axios.put('http://localhost:4000/api/actions/' + this.state.editActionData.id, {
    name,description,completed
    })
    .then((response) => {
      this._refreshActions();

      this.setState({
        editActionModal: false, editActionData: { id: '',name: '', description: '', completed: '' }
      })      
    })
    .catch(error => {
      console.log(error);
     
    });
  }
  editAction(id, name,description,completed) {
    this.setState({
      editActionData: { id, name,description,completed }, editActionModal: ! this.state.editActionModal
    });
  }
 
  deleteAction(id) {
    
    axios.delete('http://localhost:4000/api/actions/' + id)
      .then((response) => {
      this._refreshActions();
      })
     .catch(error => {
      console.log(error);
    });
  }

  _refreshActions() {      
		axios.get('http://localhost:4000/api/actions/')
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
      return (
        <tr key={Action.id}>   
         <td>{Action.id}</td>    
        <td>{Action.name}</td>
        <td>{Action.description}</td>
        <td>{Action.completed}</td>
                
         <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editAction.bind(this, Action.id, Action.name, Action.description, Action.completed )}>Edit Action</Button>
            <Button color="danger" size="sm" onClick={this.deleteAction.bind(this, Action.id)}>Delete Action</Button> {' '}
            {/*<Link to ={`/actionsactionslist/${Action.id}`} >  <Button color="success" size="sm" className="mr-2">Action Actions</Button> </Link>*/}
          </td>
        </tr>
      )
    });
    return (
      <div className="actions-Container">

      <h1>Scheduled Actions</h1>
      
      {'   '}<Button className="my-3" color="primary" onClick={this.toggleNewActionModal.bind(this)}>Add Action</Button>

      <Modal isOpen={this.state.newActionModal} toggle={this.toggleNewActionModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewActionModal.bind(this)}>Add a new Action</ModalHeader>
        <ModalBody>
            
            {/* Add New Action Data */}  
            
            {/* Action Title */}

          <FormGroup>
            <Label for="ActionName">Action Name</Label>
            <Input id="ActionName" value={this.state.newActionData.name} onChange={(e) => {
              let { newActionData } = this.state;

              newActionData.name = e.target.value;

              this.setState({ newActionData });
            }} />
          </FormGroup>

            {/* Action Description */}

          <FormGroup>
            <Label for="ActionDescription">Action Description</Label>
            <Input id="ActionDescription" value={this.state.newActionData.rating} onChange={(e) => {
              let { newActionData } = this.state;

              newActionData.description = e.target.value;

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
          
          {/* name */} 

          <FormGroup>
          
            <Label for="name">Action Name</Label>
            <Input id="name" value={this.state.editActionData.name} onChange={(e) => {
              let { editActionData } = this.state;

              editActionData.name = e.target.value;

              this.setState({ editActionData });
            }} />
          </FormGroup>

          {/* description */}

          <FormGroup>
            <Label for="description">Action Description</Label>
            <Input id="description" value={this.state.editActionData.description} onChange={(e) => {
              let { editActionData } = this.state;

              editActionData.description = e.target.value;

              this.setState({ editActionData });
            }} />
          </FormGroup>       
          
          {/* completed */}

          <FormGroup>
            <Label for="completed">Completed</Label>{' '}
            <Input id="completed" value={this.state.editActionData.completed} onChange={(e) => {
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
              <th>Action Name</th>
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

export default ActionsActionsList;
