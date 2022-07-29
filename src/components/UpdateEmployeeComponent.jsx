import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           id:this.props.match.params.id, //get id from the route
           firstname:'',
           lastname:'',
           emailid:''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.updateEmployee=this.updateEmployee.bind(this);
      }

      componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res) =>{
            let employee = res.data;
            this.setState({firstname:employee.firstname,
                lastname:employee.lastname,
                emailid:employee.emailid
            });
        }) ;     //privious id will pass over here
      }
  
      updateEmployee=(e) => {
          e.preventDefault();
          let employee = {firstname : this.state.firstname, lastname: this.state.lastname,emailid: this.state.emailid};
          console.log('employee =>'+JSON.stringify(employee));
  
          EmployeeService.updateEmployee(employee,this.state.id).then((res)=>{
            this.props.history.push('/employees');
          });
      }
    changeFirstNameHandler=(event)=>{
      this.setState({firstname:event.target.value});
    }
    changeLastNameHandler=(event)=>{
      this.setState({lastname:event.target.value});
    }
    changeEmailHandler=(event)=>{
      this.setState({emailid:event.target.value});
    }
    cancel(){
      this.props.history.push('/employees');
    }
    render() {
      return (
        <div>
          <div className='container'>
              <div className='row'>
                  <div className="card col-md-6 offset-md-3 offset-md-3">
                      <h3 className="text-center">Update Employee</h3>
                      <div className="card-body">
                          <form>
                              <div className="form-group">
                                  <label> First Name</label>
                                  <input placeholder='First Name' name='firstName' className='form-control'
                                  value={this.state.firstname} onChange={this.changeFirstNameHandler}/> 
                              </div>
                              <div className="form-group">
                                  <label> Last Name</label>
                                  <input placeholder='Last Name' name='lastName' className='form-control'
                                  value={this.state.lastname} onChange={this.changeLastNameHandler}/> 
                              </div>
                              <div className="form-group">
                                  <label> Email Address</label>
                                  <input placeholder='Email Address' name='emailId' className='form-control'
                                  value={this.state.emailid} onChange={this.changeEmailHandler}/> 
                              </div>
                              <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                              <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      )
    }
  }
  export default UpdateEmployeeComponent