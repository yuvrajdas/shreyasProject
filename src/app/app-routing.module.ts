import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsEmployeeComponent } from './view-components/lists-employee/lists-employee.component';
import { AddEditEmployeeComponent } from './view-components/add-edit-employee/add-edit-employee.component';

const routes: Routes = [
  {
    path:'employee-lists',
    component:ListsEmployeeComponent
  },
  {
    path:'employee-mangement',
    component:AddEditEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
