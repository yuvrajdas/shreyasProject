import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-lists-employee',
  templateUrl: './lists-employee.component.html',
  styleUrls: ['./lists-employee.component.scss']
})
export class ListsEmployeeComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email',"dob","gender","education","experience","package","action"];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private empService:EmployeeService) {
   this.getEmployeeLists();
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
  ngOnInIt(){
    this.getEmployeeLists();
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
