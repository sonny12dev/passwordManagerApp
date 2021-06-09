import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  
  submitLoginUser(loginFormUserData: NgForm){
    let loginUserData = {
      username: loginFormUserData.value.username,
      password: loginFormUserData.value.password
    }

    this.userService.loginUser(loginUserData).subscribe(data => {

      if(data['success'] == false){
        //Prompts error message and dismiss button
        this.snackBar.open(data['message'], 'Dismiss', { panelClass: ['red-snackbar']});
      }
      if(data['success'] == true){
        //Store data to localStorage
        localStorage.setItem('id_token', data['token']);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('username', data.username);

        //Making a reference for snackBar for afterDismissed
        let snackBarRef = this.snackBar.open('Login successfully', '', {duration: 2000, panelClass: ['green-snackbar']});

        //Using the reference so when the duration finished it will redirect to home
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['home']);
        });
      }
    });
  }
}
