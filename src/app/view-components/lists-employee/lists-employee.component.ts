import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lists-employee',
  templateUrl: './lists-employee.component.html',
  styleUrls: ['./lists-employee.component.scss']
})
export class ListsEmployeeComponent implements OnInit{
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email',"dob","gender","education","experience","package","action"];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  employeeForm!:FormGroup;
  constructor(
    private empService:EmployeeService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder
  ) {
   this.getEmployeeLists();
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
  getEmployeeLists(){
    this.empService.getEmployees().subscribe((res)=>{
      console.log(res);
      if(res.status == 200){
        this.dataSource.data = res.body as any;
      }else{
        this.dataSource.data = [];
      }
    })
  }
  // Assinging API Data to mat table datasource
  ngOnInit() {
    this.getEmployeeLists();
    this.employeeForm.patchValue(this.data)
  }

  deleteEmployee(delID:any){
    this.empService.deleteEmployee(delID).subscribe((res)=>{
      if(res.status==200){
        alert('Employee Deleted Successfully...');
        this.getEmployeeLists();
      }else{
        alert("Something went wrong please try agian...");
      }
    })
  }

  editEmployee(editRow:any){
      this.dialog.open(AddEditEmployeeComponent,{data:editRow})
  }
  // Pagination
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Filter mat table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
