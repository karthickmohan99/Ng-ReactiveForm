import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup,FormControl, Validators}from '@angular/forms';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as confetti from 'canvas-confetti';




@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
   styleUrls: ['./sign-up-modal.component.css'],
  // styles: [
  //   '.light-blue-backdrop { background-color: #5cb3fd; }'
  // ] 
  
})
export class SignUpModalComponent implements OnInit {
	submitted:Boolean
	signupForm:FormGroup;
    model: NgbDateStruct;
	placement = 'left';
   StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  constructor(private modalService:NgbModal ,
    ){}
	
  ngOnInit(): void {
	this.submitted=false;
		this.signupForm = new FormGroup({
			firstName:new FormControl('',[Validators.required,Validators.minLength(6)]),
			lastName:new FormControl('',[Validators.required]),
			mobileNumber:new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
			password:new FormControl('',[Validators.required,Validators.pattern(this.StrongPasswordRegx)]),
			dob :new FormControl('',[Validators.required]),
			gender:new FormControl('',[Validators.required])
	})
     
	

	}
  

   
  


  get f(){
	return this.signupForm.controls
  }
  

  showConfetti(): void {
	const duration = 5 * 1000; // Duration of the confetti animation in milliseconds
	const canvas = document.getElementById('confetti') as HTMLCanvasElement;
	const myConfetti = confetti.create(canvas,{ resize: true, useWorker: true, disableForReducedMotion: true });
  
	myConfetti({
	  particleCount: 200,
	  spread: 200,
	  origin: { y: 0.6, x: 0.5 }, // Center of the page
	});
  
	setTimeout(() => {
	  myConfetti.reset();
	  this.submitted = false; // Reset the submitted state
	}, duration);
  }
	closeResult = '';
    
	
	open(content: TemplateRef<any>) {
		
	  
		this.modalService.open(content,{ size: 'lg', backdropClass: 'light-blue-backdrop',scrollable: true, backdrop: 'static' }).result.then(
			(result: any) => {
				
				
				
				console.log("saved")
				this.closeResult = result;
				this.signupForm.reset();
				this.submitted=true;
				this.showConfetti();
				
			},
			
		);



		
	}



	
	
	 

	
}
