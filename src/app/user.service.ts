import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from './model/user.model';
import { environment } from '../environments/environment.dev';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  registerUser(registerFormUserData): Observable<UserModel>{
    //This will display http://localhost:3000/login
    const url = environment.BASE_URL + environment.USER.REGISTER_USER;

    return this.httpClient.post<UserModel>(url, registerFormUserData);
  }

  loginUser(loginFormUserData): Observable<UserModel>{
    const url = environment.BASE_URL + environment.LOGIN.LOGIN_USER;

    return this.httpClient.post<UserModel>(url, loginFormUserData);
  }

  logOutUser(){
    localStorage.clear();
    return false;
  }

  //Check if token is expired
  isLoggedIn(){
    const helper = new JwtHelperService();
    const token = localStorage.getItem('id_token');
    return helper.isTokenExpired(token);
  }

  //For AdminGuard - return token true or false
  loadToken(){
    const token = localStorage.getItem('id_token');
    return token ? true : false;
  }

  addLogPassword(addPasswordData): Observable<UserModel>{
    const token: string = localStorage.getItem('id_token');
    const userId: string = localStorage.getItem('userId');
  
    //Headers for authorization include jwt token
    const httpHeaders = new HttpHeaders({
      'Content-type': 'Application/json',
      'Authorization': token
    });

    const url = environment.BASE_URL + environment.PASSWORD.ADD_LOG_PASSWORD + userId;

    return this.httpClient.post<UserModel>(url, addPasswordData, { headers: httpHeaders });
  }

  showListPassword(): Observable<UserModel>{
    const token: string = localStorage.getItem('id_token');
    const userId: string = localStorage.getItem('userId');
  
    //Headers for authorization include jwt token
    const httpHeaders = new HttpHeaders({
      'Content-type': 'Application/json',
      'Authorization': token
    });

    const url = environment.BASE_URL + environment.PASSWORD.LIST_PASSWORD + userId;

    return this.httpClient.get<UserModel>(url, {headers: httpHeaders});

  }

  updateLogPassword(data, logId): Observable<UserModel>{
    const token: string = localStorage.getItem('id_token');
    const userId: string = localStorage.getItem('userId');
  
    //Headers for authorization include jwt token
    const httpHeaders = new HttpHeaders({
      'Content-type': 'Application/json',
      'Authorization': token
    });

    const url = environment.BASE_URL + environment.PASSWORD.EDIT_PASSWORD + userId + '/' + logId;

    return this.httpClient.patch<UserModel>(url, data, {headers: httpHeaders});
  }

  deleteLogPassword(logId){
    const token: string = localStorage.getItem('id_token');
    const userId: string = localStorage.getItem('userId');
  
    //Headers for authorization include jwt token
    const httpHeaders = new HttpHeaders({
      'Content-type': 'Application/json',
      'Authorization': token
    });

    //This is example of es6 template string to come up a link like this http://localhost:3000/user/deleteLog/:userId/:logId
    const url = `${environment.BASE_URL}${environment.PASSWORD.DELETE_LOG}${userId}/${logId}`

    return this.httpClient.delete(url, {headers: httpHeaders});
  }
}
