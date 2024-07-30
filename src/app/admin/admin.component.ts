import { Component } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/envirnoment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {


  constructor (private router:Router, private authService: AuthService){}

  dropdownVisible : boolean = false;
  showUserSettingsTable: boolean = false;
  dataEntryDropdown: boolean = false;
  locations: string[] = ['Aliyar', 'Chulliyar', 'Kanhirapuzha','Malampuzha', 'Mangalam', 'Meenkara'];
  url = environment.apiUrl;
  userDetails: any[] = [];
  username: string = '';
  password: string = '';
  thirdVar: string = '';
  isEntering: boolean = false;
  showAddUserForm: boolean = false;
  showRemoveUserForm: boolean = false;
  showUpdateUserForm: boolean = false;
  showViewUsersTable: boolean = false;
  isTableVisible: boolean = false;

  dataEntrySelect(event:Event){
    var location = (event.target as HTMLSelectElement).value;
    this.routeTo(location);
  }

  toggleDropdown(){
    this.dropdownVisible = !this.dropdownVisible;
  }

  routeTo(location:string){
    this.router.navigate([`/admin/${location}`], { queryParams: { fromAdmin: true } });
  }

  logOut(){
    this.authService.setLoginStatus(false);
    this.router.navigate(['/login']);
  }
  
  showDataEntryDropdown(){
    this.dataEntryDropdown = true;
    this.showUserSettingsTable = false ;
  }

  showUserSettings(){
    this.showUserSettingsTable = true;
    this.dataEntryDropdown = false;
  }

  viewUsers(){
    this.showViewUsersTable = true;
    this.showAddUserForm = false;
    this.showRemoveUserForm = false;
    this.showUpdateUserForm = false;
    this.getFn('viewUsers');
  }

  addUser(){
    
    this.showViewUsersTable = false;
    this.showAddUserForm = true;
    this.showRemoveUserForm = false;
    this.showUpdateUserForm = false;
  }

  updateUser(){
    this.showViewUsersTable = false;
    this.showAddUserForm = false;
    this.showRemoveUserForm = false;
    this.showUpdateUserForm = true;
  }

  removeUser(){
    this.showViewUsersTable = false;
    this.showAddUserForm = false;
    this.showRemoveUserForm = true;
    this.showUpdateUserForm = false;
  }

  getFn(action:string){
    if(action == 'viewUsers'){
      var url = `${this.url}?action=getUserDetails`;
      fetch(url, {
        method : 'GET',
      })
      .then(response => response.text())
      .then(data =>{
        var jsonData = JSON.parse(data)
        this.userDetails = jsonData.value;
        this.isTableVisible = true;
      })
    }
    else{
      alert('Error! Invalid GET function');
    }
  }

  postFn(action: string){
    var requestBody;
    this.isEntering = true;
    if(action == 'addUser'){

      if(this.username&&this.password&&this.thirdVar){
        requestBody = {
          action: 'updateUser',
          fn:'addUser',
          username: this.username,
          password: this.password,
          access: this.thirdVar
        }
        this.sendReq(this.url, requestBody);
      }
      else{
        alert('Fill all information');
      }
      
    }
    else if(action == 'removeUser'){

      if(this.username&&this.password){
        requestBody = {
          action: 'updateUser',
          fn: 'removeUser',
          username: this.username,
          password: this.password
        }

        this.sendReq(this.url,requestBody);
      }
      else{
        alert('Fill all information');
      }
      
    }
    else if(action == 'updateUser'){
      if(this.username&&this.password){
        requestBody = {
          action: 'updateUser',
          fn: 'updateUser',
          username: this.username,
          password: this.password
        }
        this.sendReq(this.url,requestBody);
      }
      else{
        alert('Fill all information');
      }
    }
  }

  sendReq(url:string, requestBody:any){
    fetch(url, {
      redirect: 'follow',
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'text/plain'
      },
      
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response);
      return response.json();
    })
    .then(data => {
      alert(data.result);
      this.isEntering = false;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
}
