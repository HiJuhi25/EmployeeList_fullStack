package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.ResourceNotFound;
import com.example.demo.model.employee;
import com.example.demo.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	//get all employees
	@GetMapping("/employees")
	public List<employee> getAllEmployees(){
		return employeeRepository.findAll();
	} 
	//create employee rest api
	@PostMapping("/employees")
	public employee createEmployee(@RequestBody employee employee) {
		return employeeRepository.save(employee);
	}
	
	//get employee by id rest api
	
	@GetMapping("/employees/{id}")
	public ResponseEntity <employee> getEmployeeById(@PathVariable Long id) {
		
		employee employee = employeeRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFound("Employee not found with id:"+ id));
		return ResponseEntity.ok(employee);
	}
	
	//update employee rest api
	
	@PutMapping("/employees/{id}")
	public ResponseEntity<employee> updateEmployee(@PathVariable Long id, @RequestBody employee employeeDetails){
		employee employee = employeeRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFound("Employee not found with id:"+ id));
		employee.setFirstname(employeeDetails.getFirstname());
		employee.setLastname(employeeDetails.getLastname());
		employee.setEmailid(employeeDetails.getEmailid());
		
		employee updatedEmployee = employeeRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}
	
	// Delete employee rest api
	
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable Long id){
		employee employee = employeeRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFound("Employee not found with id:"+ id));
		
		employeeRepository.delete(employee);
		Map<String,Boolean> response = new HashMap<>();
		response.put("deleted",Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
} 