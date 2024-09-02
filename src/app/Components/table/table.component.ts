import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { CrudServiceService } from 'src/app/services/crud-service.service';
import { SigInData } from 'src/app/sig-in-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
    empData:SigInData[];
    isUpdate:boolean;
    id:number;
    selectedId: number | null ;
  // formData$: Observable<SigInData[]>;
  constructor(private service: CrudServiceService, private toastr:ToastrService) {
     //  this.formData$ = this.service.formData$;
    
  }

  ngOnInit() {
    //  this.formData$ =of(JSON.parse(localStorage.getItem("data") || "[]"));
    // this.formData$.subscribe((val) => {
    //   console.log(val, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    // })
    this.isUpdate=false;
    this.service.getEmployee().subscribe(Data=>{
      console.log(Data,"Getttttted")
      this.empData=Data;
    })
  }


  onUpdate(id:number|any){
   this.isUpdate=true;
   this.id=id;
     console.log(this.isUpdate,"updateee");
     console.log(id,"iddddd")
  }


  onDelete(id:number|any){
    this.selectedId = id;
   
  }


  confirmDelete(): void {
    if (this.selectedId !== null) {
      // Call your delete service here to delete the item
      // this.yourService.deleteItem(this.selectedId).subscribe(...);
      this.service.deleteEmployee(this.selectedId).subscribe(data=>{
        console.log(data,"deleted Data");
  
        this.toastr.success("Emplyee deleted successfully");
        this.ngOnInit();
        console.log('Deleting item with ID:', this.selectedId);
        this.selectedId = null; // Clear selected ID
      },err=>{
        console.log(err,"Something wen wrong try again");
        
      })
     
    }
  }
}


