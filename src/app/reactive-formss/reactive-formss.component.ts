import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../validators/confirm-password.validator';
import {SigInData} from '../sig-in-data';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CrudServiceService } from '../services/crud-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reactive-formss',
  templateUrl: './reactive-formss.component.html',
  styleUrls: ['./reactive-formss.component.css']
})


export class ReactiveFormssComponent implements OnInit ,AfterViewInit{

  @Input()isUpdateStatus:boolean;
  @Input() updatedId:number;

  showPassword:boolean;
  SignupForm:FormGroup;
  StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  MobileNumberRegx:RegExp=/^((\\+91-?)|0)?[0-9]{10}$/;
  @ViewChild("firstName")FirstNameControl:ElementRef

   EmployeeById:SigInData;


  
  //Constructor gets invoked when the instance of component is created
  constructor(private fb:FormBuilder, private router:Router, private service:CrudServiceService,private toastr: ToastrService){
        
  }

  //It gets called after the view got rendered 

  ngAfterViewInit(): void {
     this.FirstNameControl.nativeElement.focus();
  }

  //ngOnInit gets invoked once the component is initialized at this point template view are not rendered.
  ngOnInit(): void {

     this.showPassword=false;
     this.SignupForm=this.fb.group({
      empName:["",Validators.required],
      empDepartment:["",Validators.required],
      empDesignation:["",Validators.required],
      empMail:["",[Validators.required,Validators.email]],
      empPhoneNumber:["",[Validators.required,Validators.pattern(this.MobileNumberRegx)]],
      ps:["",[Validators.required,Validators.pattern(this.StrongPasswordRegx)]],
      conformPs:["",Validators.required],
     
     },
     { validators: confirmPasswordValidator }
    );

    

    //Get EmployeeBy Id
     console.log(this.updatedId,"id from form")
     if(this.isUpdateStatus){
     this.f['ps'].disable();
     this.f['conformPs'].disable();
      this.loadEmployeeData();
     }
     

  }

  


  private loadEmployeeData(): void {
    this.service.getEmployeeById(this.updatedId).subscribe(data => {
      this.EmployeeById = data;
      this.SignupForm.patchValue({
        empName: this.EmployeeById.empName,
        empDepartment: this.EmployeeById.empDepartment,
        empDesignation: this.EmployeeById.empDesignation,
        empMail: this.EmployeeById.empMail,
        empPhoneNumber: this.EmployeeById.empPhoneNumber,
      });
    }, err => {
      console.log(err);
      this.toastr.error("Failed to load employee data. Please try again later.");
    });
  }
  
//get is a keyword in JS
//Getters are generally used to retrieve or compute values(ReadOnly)
// When you access a getter, it behaves like a property of an object rather than a function   
get f(){
  return this.SignupForm.controls;
}



  onSubmit() {
    console.log(this.SignupForm.value, "valueeeeee");
    const { empName, empDepartment, empDesignation, empMail, empPhoneNumber } = this.SignupForm.value;
    const employeeData = { empName, empDepartment, empDesignation, empMail, empPhoneNumber };
    console.log(employeeData, "Formatted data");
  //Submit for add form
    if (this.SignupForm.valid) {
      if(!this.isUpdateStatus){
        this.service.addEmployee(employeeData).subscribe(response => {
          if (response.status === 201) {
            console.log(response.body, "postedData");
            
            this.toastr.success("Employee created successfully");
            this.router.navigate(['/home']);
          } else {
            console.log(response.body, "Unexpected response");
          }
        }, err => {
           this.handleError(err);
        });
      }else{
        console.log("updateeeeeeeeeeee")
        this.service.updateEmployee(employeeData,this.updatedId).subscribe(response => {
          
            console.log(response.body, "postedData");
            
            this.toastr.success("Employee Updated successfully");
            location.reload();
            //this.router.navigate(['/home']);
            
          
        }, err => {
          this.handleError(err);
        });
      }
    }
  }



  private handleError(err: any): void {
    console.log(err.status, "Error");
    if (err.status === 400) {
      this.toastr.error("This email already exists. Please use a different email.");
    } else {
      this.toastr.error("An error occurred. Please try again later.");
    }
  }
  

  toggleShow(){
     //console.log("tttttttttttttttttttttttttttt", !this.showPassword);
    //  !this.showPassword ;
    this.showPassword=!this.showPassword;
    
  }

}
