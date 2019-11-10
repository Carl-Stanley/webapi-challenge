import React, { Component } from 'react'; 
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import moment from 'moment';
import {axiosWithAuth} from '../utils/axiosWithAuth';

class EventsTasks extends Component {
   constructor () {

    super(); 
   
    this.loggedinUserID = 6;
    this.Event_id = 33;        
   }
    
  state = {
    Tasks: [],
    newTaskData: {
        task_name: '',
        event_id: '',
        task_completed: false
   },
    editTaskData: {
        id: '',
        task_name: '',
        event_id: '',
        task_completed: ''      
    },
    newTaskModal: false,
    editTaskModal: false
  }
  componentDidMount() {
    this._refreshTasks();
  }
  toggleNewTaskModal() {
    this.setState({
      newTaskModal: ! this.state.newTaskModal
    });
  }
  toggleEditTaskModal() {
    this.setState({
      editTaskModal: ! this.state.editTaskModal
    });
  }
  addTask() {
      
    axiosWithAuth()    
    .post('/api/tasks/?event_id=' + this.Event_id, this.state.newTaskData).then((response) => {
      let { Tasks } = this.state;
      
      Tasks.push(response.data);

      this.setState({ Tasks, newTaskModal: false, newTaskData: {
        task_name: '',
        completed: ''
      }})      
   })
   .catch(error => {
    console.log(error)
    
    })
  }
  updateTask() {
    let { task_name,task_completed } = this.state.editTaskData;
    axiosWithAuth()
    .put('/api/tasks/' + this.state.editTaskData.id, {
      task_name, task_completed: task_completed === "true" ? true:false 
    })
    .then((response) => {
      this._refreshTasks();
       // debugger;
      this.setState({
        editTaskModal: false, editTaskData: { id: '',task_name: '', task_completed: '' }
      })      
    })
    .catch(error => {
      console.log(error);
     //debugger;
    });
  }
  editTask(id, task_name, task_completed) {
    this.setState({
      editTaskData: { id, task_name, task_completed }, editTaskModal: ! this.state.editTaskModal
    });
  }
 
  deleteTask(id) {
    axiosWithAuth()
    .delete('/api/tasks/' + id)
      .then((response) => {
      this._refreshTasks();
      })
     .catch(error => {
      console.log(error);
    });
  }

  _refreshTasks() {    
    axiosWithAuth()
		.get('/api/tasks/?event_id=' + this.Event_id)
    .then(response => {
      this.setState({
        Tasks: response.data
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  
  render() {
    
    /*
    let comp = '';
    
    if(Task.completed) {

      comp = 'Yes'

    } else {

      comp = 'No'

    }*/
    let Tasks = this.state.Tasks.map((Task) => {
      return (
        <tr key={Task.id}>   
         <td>{Task.id}</td>    
        <td>{Task.task_name}</td>
        <td>{Task.task_completed}</td>
                  
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editTask.bind(this, Task.id, Task.task_name,Task.task_completed )}>Edit Task</Button>
            <Button color="danger" size="sm" onClick={this.deleteTask.bind(this, Task.id)}>Delete Task</Button> {' '}
          </td>
        </tr>
      )
    });
    return (
      <div className="events-Container">

      <h1>Event Tasks</h1>
      
      {'   '}<Button className="my-3" color="primary" onClick={this.toggleNewTaskModal.bind(this)}>Add Task</Button>

      <Modal isOpen={this.state.newTaskModal} toggle={this.toggleNewTaskModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewTaskModal.bind(this)}>Add a new Task</ModalHeader>
        <ModalBody>
            
            {/* Add New Task Data */}  
            
            {/* Event Task */}

          <FormGroup>
            <Label for="TaskDescription">Task Description</Label>
            <Input id="TaskDescription" value={this.state.newTaskData.task_name} onChange={(e) => {
              let { newTaskData } = this.state;

              newTaskData.task_name = e.target.value;

              this.setState({ newTaskData });
            }} />
          </FormGroup>
            
        
        {/* completed */} 
        <FormGroup>            

          <Input id="completed" type='hidden' value={false} onChange={(e) => {
              let { newTaskData } = this.state;

              newTaskData.task_completed = e.target.value;

              this.setState({ newTaskData });
            }} />
        
          </FormGroup>       


        </ModalBody>
        
        <ModalFooter>

          <Button color="primary" onClick={this.addTask.bind(this)}>Add Task</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewTaskModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editTaskModal} toggle={this.toggleEditTaskModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditTaskModal.bind(this)}>Edit/Preview Task Details</ModalHeader>
        <ModalBody>
          
          {/* Edit Task Data */}  
          
          {/* task_title */} 

          <FormGroup>
          
            <Label for="task_title">Event Title</Label>
            <Input id="task_title" value={this.state.editTaskData.task_name} onChange={(e) => {
              let { editTaskData } = this.state;

              editTaskData.task_name = e.target.value;

              this.setState({ editTaskData: {...editTaskData}});
            }} />
          </FormGroup>
                           
          {/* completed */}

          <FormGroup>
            <Label for="completed">Completed</Label>{' '}
            <Input id="completed" value={this.state.editTaskData.completed} onChange={(e) => {
              let { editTaskData } = this.state;

              editTaskData.completed = e.target.value;

              this.setState({ editTaskData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateTask.bind(this)}>Update Task</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditTaskModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table className='theTasks'>
          <thead>
            <tr>
              <th>#</th>
              <th>Task Title</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {Tasks}
          </tbody>
        </Table>
       

      </div>
    );
  }
}

export default EventsTasks;
