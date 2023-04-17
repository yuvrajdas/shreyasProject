import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
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




















  // separatorKeysCodes: number[] = [ENTER, COMMA];
  // fruitCtrl = new ('');
  // filteredFruits: Observable<string[]>;
  // fruits: string[] = ['Lemon'];
  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  // @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();

  //   // Add our fruit
  //   if (value) {
  //     this.fruits.push(value);
  //   }

  //   // Clear the input value
  //   event.chipInput!.clear();

  //   this.fruitCtrl.setValue(null);
  // }

  // remove(fruit: string): void {
  //   const index = this.fruits.indexOf(fruit);

  //   if (index >= 0) {
  //     this.fruits.splice(index, 1);
  //   }
  // }

  // selected(event: MatAutocompleteSelectedEvent): void {
  //   this.fruits.push(event.option.viewValue);
  //   this.fruitInput.nativeElement.value = '';
  //   this.fruitCtrl.setValue(null);
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  // }

}
