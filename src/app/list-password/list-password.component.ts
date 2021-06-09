import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
//import * as $ from "jquery";

@Component({
  selector: 'app-list-password',
  templateUrl: './list-password.component.html',
  styleUrls: ['./list-password.component.css']
})
export class ListPasswordComponent implements OnInit {
  listPassword: any;
  showListModalPassword: any;
  openModal: boolean = false;
  logId: string;
  updateStatus: boolean = false
  //deletedDataMsg: any;
  toggleDisable: boolean;
  logAction: string;

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.showListPassword();
  }

  showListPassword(){

    this.userService.showListPassword().subscribe(data => {
      
      this.listPassword = data;
        //console.log(this.listPassword);
      if(this.listPassword == '') return false;

    });

  }

  showModal(list, toggle?){
    //console.log(list);
    this.showListModalPassword = list;
    this.openModal = true;
    if(toggle == true){
    this.toggleDisable = toggle;
    this.logAction = 'View';
    this.updateStatus = false;
    }else if(toggle == false){
      this.toggleDisable = toggle;
      this.logAction = 'Edit';  
    }
    //console.log(toggle);
  }

  updateFormLogPassword(updateLogPasswordDetail: NgForm){
    const logId = updateLogPasswordDetail.value.logId;
    let updateLogPasswordData = {
      title: updateLogPasswordDetail.value.title,
      username: updateLogPasswordDetail.value.username,
      email: updateLogPasswordDetail.value.email,
      password: updateLogPasswordDetail.value.password
    }

    //This is a example of a template string
    //console.log(`${logId} wowow`);

    this.userService.updateLogPassword(updateLogPasswordData, logId).subscribe(data => {
      //console.log(data);
      if(data['success'] == true){
        this.updateStatus = true;
        //console.log('yow');
      }
      else if(data['success'] == false){
        console.log(data['error']);
      }
    });
  }

  //Delete logId
  deleteLog(logId){
    this.userService.deleteLogPassword(logId).subscribe(data => { 
      //console.log(data);  
      if(data['success'] == true){
        //You can use either of the two

        this.showListPassword(); //This will call the API and display again the listPassword

        //This is a jquery hack but it is not a good practice to use this but if it will do the job use this minimal
        //$("#" + logId).remove(); //This will remove the deleted log record but the remaining will display the #(number count) not inorder
      }
    });
  }
}
