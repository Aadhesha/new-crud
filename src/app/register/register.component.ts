import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';
import { User } from '../user-data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User[] = [];
  newUser: any;
  len: any;

  constructor(private fb: FormBuilder, private dataService: DataService, private route: ActivatedRoute, private router:Router) { }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
      this.registerForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        age: ['', Validators.required],
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: ['', Validators.required]
      })
  
  }

  get f(){
    return this.registerForm.controls;
  }

  submit() {
    console.warn("Form", this.registerForm);
    let form = this.registerForm.value;
    if(this.registerForm.status === 'VALID'){
      this.newUser = {
        id: null,
        name: form.name,
        email: form.email,
        age: form.age,
        country: form.country,
        state: form.state,
        city: form.city,
        zipcode: form.zipcode
      }
      this.dataService.addUser(this.newUser).subscribe(data => {
        console.log('this.newUser',data);
        Swal.fire({
          title: 'Success',
          text: "Successfully Registered!",
          icon: 'success',
          showConfirmButton: true,
          confirmButtonColor: '#3085f6',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
        }).then((confirmResult) => {
          this.registeredUsers();
          if (confirmResult.value) {
            if (true) {
              this.registerForm.reset();
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
      this.len = data.length;
    });
  }
}
