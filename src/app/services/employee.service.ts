import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
   baseUrl = 'http://localhost:3000/employees/';
  // adding empoyee
  postEmployee(employee:any):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`,employee, {observe:'response'});
  }

  // fetching employees data
  getEmployees(){
    return this.http.get(`${this.baseUrl}/`, {observe:'response'});
  }

  deleteEmployee(id:any){
    return this.http.delete<any>(`${this.baseUrl}${id}`, {observe:'response'})
    // return this.http.delete<number>(this.bookUrl+"/"+bookid);
  }
}
