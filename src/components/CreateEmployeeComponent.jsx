import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        //step 2
         id:this.props.match.params.id, 
         firstname:'',
         lastname:'',
         emailid:''
      }
      this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
      this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
      this.saveEmployee=this.saveEmployee.bind(this);
    }

   //step 3
    componentDidMount(){

      //step 4

      if(this.state.id == -1){
        return
      }else{
        EmployeeService.getEmployeeById(this.state.id).then((res) =>{
          let employee = res.data;
          this.setState({firstname:employee.firstname,
              lastname:employee.lastname,
              emailid:employee.emailid
          });
        }) ;     //privious id will pass over here
      }
      
    }

    saveEmployee=(e) => {
        e.preventDefault();
        let employee = {firstname : this.state.firstname, lastname: this.state.lastname,emailid: this.state.emailid};
        console.log('employee =>'+JSON.stringify(employee));
        
        //step 5
        if(this.state.id == -1){
          EmployeeService.createEmployee(employee).then((res) =>{
            this.props.history.push('/employees');
        });
        }else{
          EmployeeService.updateEmployee(employee,this.state.id).then((res)=>{
            this.props.history.push('/employees');
          });
        }
        
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

  getTitle(){
    if(this.state.id == -1){
      return  <h3 className="text-center">Add Employee</h3>
    }else{
      return  <h3 className="text-center">Update Employee</h3>
    }
  }
  render() {
    return (
      <div>
        <div className='container'>
            <div className='row'>
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {
                      this.getTitle()
                    }
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
                            <button className="btn btn-success" onClick={this.saveEmployee}>Save</button>
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

export default CreateEmployeeComponent