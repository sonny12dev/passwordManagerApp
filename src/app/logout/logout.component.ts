import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  loginStatus: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let loginStatus = this.userService.logOutUser();
    //If not login then go to login page
    if(!loginStatus) this.router.navigate(['login']);
  }

}
