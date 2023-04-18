import {Component} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent {

  employeeForm!:FormGroup;
  educations:string[] = ['B.Tech','M.Tech','B.Sc','M.sc'];
  constructor(private fb:FormBuilder, private empService: EmployeeService) {
    this.employeeForm = fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      dob:['',Validators.required],
      gender:['',Validators.required],
      education:['',Validators.required],
      experience:['',Validators.required],
      package:['',Validators.required],
    })
  }

  submitForm(){
    this.empService.postEmployee(this.employeeForm.value).subscribe((res)=>{
      console.log(res.body);

      if(res.status == 201){
        alert('created')
        this.employeeForm.reset();
      }else{
        alert('error something went worng please try again...')
      }
    })
  }


}
