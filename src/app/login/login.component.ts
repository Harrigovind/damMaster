import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../environments/envirnoment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  
  username: string ='';
  password: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient){}
  
  login() {
    
    const link = environment.apiUrl;
    const url = `${link}?action=verifyUser&username=${this.username}&password=${this.password}`;
    this.isLoading = true;
    fetch(url, {
      method : 'GET',
    })
    .then(response => response.text())
    .then(data =>{
        var jsonData = JSON.parse(data);
        if (jsonData.location !== undefined){
          console.log(jsonData);
          const path = `/${jsonData.location}`;
          console.log(path);
          this.authService.setLoginStatus(true);
          this.router.navigate([path]);
        }
        else{
          alert(jsonData.error);
        }
        this.isLoading = false;
    })
    
  }
}

