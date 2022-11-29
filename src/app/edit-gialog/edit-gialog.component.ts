import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';
import { User } from '../user-data';
import { ActivatedRoute, Router} from '@angular/router'


@Component({
  selector: 'app-edit-gialog',
  templateUrl: './edit-gialog.component.html',
  styleUrls: ['./edit-gialog.component.css']
})
export class EditDialogComponent implements OnInit {
  editForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
  })
  user: User[] = [];
  editField: any;
  idToEdit: any;
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    public dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private route: ActivatedRoute, private router:Router) { }
    idtoUpdate = 1;
  

  ngOnInit() {
    this.editForm.setValue({
      id : this.data.id,
      name: this.data.name,
      email: this.data.email,
      age: this.data.age,
      country: this.data.country,
      state: this.data.state,
      city: this.data.city,
      zipcode: this.data.zipcode,
    })
  }

  submit(){
    this.editField = this.editForm.value;
    this.idToEdit = {
      id: this.editField.id,
      name: this.editField.name,
      email: this.editField.email,
      age: this.editField.age,
      country: this.editField.country,
      state: this.editField.state,
      city: this.editField.city,
      zipcode: this.editField.zipcode,
    }
    if(this.editForm.status === 'VALID'){
      this.dataService.updateUser(this.idToEdit).subscribe(data1 => {
        console.log(data1)
        Swal.fire({
          title: 'Success',
          text: "Edited Successfully!",
          icon: 'success',
          showConfirmButton: true,
          confirmButtonColor: '#3085f6',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
        }).then((confirmResult) => {
          if (confirmResult.value) {
            if (true) {
              this.registeredUsers();
            }
          }
        });
        });
    }
   
  }

  registeredUsers() {
    this.dataService.getRegisteredUsers().subscribe(data => {
      console.log('this.user',data);
      this.user = data;
      this.dialogRef.close({data:this.user});
      
    });
  }

  onCancel() {
    this.dialogRef.close();
  }


}
