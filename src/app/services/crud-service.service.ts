import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SigInData } from '../sig-in-data';
import {environment}from '../../environments/environment';
import {HttpClient}from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  private udateSubject:BehaviorSubject<boolean>;
  isUpdate:Observable<boolean>;
  // private SubmitFormSubject: BehaviorSubject<SigInData[]>;
  // formData$:Observable<SigInData[]>;
  constructor(private http:HttpClient) { 
    console.log(environment.production);
    this.udateSubject=new BehaviorSubject<boolean>(false);
    this.isUpdate=this.udateSubject.asObservable();
    //this.SubmitFormSubject=new BehaviorSubject<SigInData[]>([{"eMail":"kar@gc.com","fName":"kk","lName":"lnn",mobile:2345678907}]);
   // this.formData$=this.SubmitFormSubject.asObservable();
  }

  // setFormData(data:SigInData[]){
  //   this.SubmitFormSubject.next(data);
  // }

  setUpdateStatus(){
      this.udateSubject.next(true);
    }


  addEmployee(employee:SigInData):Observable<any>{
       return this.http.post<string>(`${environment.link}/addEmployee`,employee, { observe: 'response' });
  }

  getEmployee():Observable<SigInData[]>{
    return this.http.get<SigInData[]>(`${environment.link}/listEmployees`);
  }

  updateEmployee(updatedEmp:SigInData,id:number):Observable<any>{
    return this.http.put<any>(`${environment.link}/update/${id}`,updatedEmp, { observe: 'response' });
  }

  getEmployeeById(id:number):Observable<SigInData>{
      return this.http.get<SigInData>(`${environment.link}/listById/${id}`);
  }

  deleteEmployee(id:number):Observable<SigInData>{
    return this.http.delete<SigInData>(`${environment.link}/deleteEmployee/${id}`);

  }
}
