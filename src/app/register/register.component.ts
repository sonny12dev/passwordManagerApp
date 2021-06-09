import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMsg: any;
  msgStatus: any;
  statusColor: any;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  registerUser(registerFormUserData: NgForm){
   //console.log(registerUserDetail.value);
    let newUser = {
      username: registerFormUserData.value.username,
      email: registerFormUserData.value.email,
      password: registerFormUserData.value.password
    }

    this.userService.registerUser(newUser).subscribe(data => {
      
      if(data['success'] == false){
        this.msgStatus = data['message'];
        //NOTE: You can also use ['mat-toolbar', 'mat-warn or mat-accent or mat-primary'] aside from customize one like this.
        this.statusColor = 'red-snackbar';
      }else if(data['success'] == true){
        this.msgStatus = 'Data successfully save';
        this.statusColor = 'green-snackbar';
      }

      //Display a message
      this.snackBar.open(
        this.msgStatus,
        '',
        { 
          duration: 2000,
          verticalPosition: 'bottom', // 'top' | 'bottom'
          horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
          panelClass: [this.statusColor],
        });

      //Reset the form
      registerFormUserData.reset();
    },
    (error: ErrorEvent) => {
      console.log('Error: ' + error.error.message );
    this.errorMsg = error.error.message
    this.snackBar.open(
      'Error: ' + error.error.message,
      'Dismiss',
      { 
        //duration: 2000,
        verticalPosition: 'bottom', // 'top' | 'bottom'
        horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
      });
    });
  }
}
