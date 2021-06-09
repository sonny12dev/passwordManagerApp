import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-password',
  templateUrl: './add-password.component.html',
  styleUrls: ['./add-password.component.css']
})
export class AddPasswordComponent implements OnInit {
  msgStatus: string;
  snackBarStatus: any;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  addLogPassword(addPasswordData: NgForm){
    //console.log(addPasswordData.value);

    let newLogPasswordData = {
      title: addPasswordData.value.title,
      username: addPasswordData.value.username,
      email: addPasswordData.value.email,
      password: addPasswordData.value.password
    }

    this.userService.addLogPassword(newLogPasswordData).subscribe(data => {
      if(data['success'] == false){
        this.msgStatus = data['message'];
        this.snackBarStatus = ['red-snackbar'];
      }else if(data['success'] == true){
        //This are the data return by the api
        //this.msgStatus = JSON.stringify(data['savedData']);
        this.msgStatus = 'Data successfully save'
        this.snackBarStatus = ['green-snackbar'];
      }

      this.snackBar.open(
        this.msgStatus,
        '',
        {
          duration: 2000,
          panelClass: this.snackBarStatus
        }
      );

      if(data['success'] == true) addPasswordData.reset();
    },
    //This error message comes from the browser not from the declared api err.
    (error : ErrorEvent) => console.log(error.message + ' wew'));
  }
}
