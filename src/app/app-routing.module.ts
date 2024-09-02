import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableComponent } from './Components/table/table.component';
import { ReactiveFormssComponent } from './reactive-formss/reactive-formss.component';


const routes: Routes = [
  {path:"home",component:TableComponent},
  {path:"form",component:ReactiveFormssComponent},
  {path:"",redirectTo:"form",pathMatch:'full'},
  //{path:'**',redirectTo:'form',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
