import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';
import { EditDialogComponent } from '../edit-gialog/edit-gialog.component';
import { DataService } from '../services/data.service';
import { User } from '../user-data';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'age', 'country', 'state', 'city', 'zipcode', 'actions'];
  users: User[] = [];
  editRowdata: any;
  constructor(private dataService: DataService, private dialog: MatDialog, private route: ActivatedRoute) { }
  idtodelete=1;
  ngOnInit() {
    this.registeredUsers();
    this.route.paramMap.subscribe((params: ParamMap) => {
      // this.users = +params.get('data')
    })
  }

  registeredUsers() {
    this.dataService.getRegisteredUsers().subscribe(data => {
      console.log('this.user',data);
      this.users = data;
    });
  }

  onEdit(row:any) {
    this.editRowdata = row;
     let dialogRef = this.dialog.open(EditDialogComponent, {
      height: '250px',
      width: '350px',
      // width: '50%',
      // minHeight: 'calc(100vh - 90px)',
      // height : 'auto',
      data: this.editRowdata
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res.data)
      this.users = res.data;
    })

  }

  onDelete(row:any) {
      let name = row.name;
    let deleteSuccessMsg = `${name} is deleted!`
      // let deleteSuccessMsg = name+' is deleted!'
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataService.deleteUser(row.id).subscribe(data => {
            console.log(data);
          this.registeredUsers();
          })
          Swal.fire(
            'Deleted!', //title
            deleteSuccessMsg, //text
            'success' //icon
          )
        }
      });
  }

}


