import { Component, OnInit } from '@angular/core';
import { environment, staticData } from '../environments/envirnoment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-malampuzha',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './malampuzha.component.html',
  styleUrl: '../styles.css'
})

export class MalampuzhaComponent implements OnInit{

  constructor(private authService:AuthService, private router:Router, private route:ActivatedRoute){};

  date: string = '';
  level: number = 0;
  urc: number = 0;
  storage: number = 0;
  lbc: number = 0;
  rbc: number = 0;
  spillway: number = 0;
  powerhouse: number = 0;
  otherOutflow: number = 0;
  rainfall: number = 0;
  remarks: string ='';
  frl: number = 0;
  grossStorage: number = 0;
  totalOutflow: number = 0;
  totalInflow: number = 0;
  lastStorage: number = 0;
  displayData: any[] = [];
  username: string = '';
  password: string = '';
  newCredential: string = '';
  showTable: boolean = false;
  showForm: boolean = false;
  showSettings:boolean = false;
  showUsernameTable: boolean = false;
  showPasswordTable: boolean = false;
  isEntering: boolean = false;
  isTableVisible: boolean = false;
  minDate: string = '';
  disableDateButton: boolean = true;
  fromAdmin: boolean = false;
  url = environment.apiUrl;
  
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.fromAdmin = params['fromAdmin'] === 'true';
    });

    if(this.fromAdmin){
      this.initDataEntry();
    }
  }
  
  changeCredentials(){

    var requestBody;
    if (this.showUsernameTable){
      requestBody = {
        username: this.username,
        password: this.password,
        newUsername: this.newCredential,
        action: 'changeCredentials',
        fn:'changeUsername'
      }
    }
    else{
      requestBody = {
        username: this.username,
        password: this.password,
        newPassword: this.newCredential,
        action: 'changeCredentials',
        fn:'changePassword'
      }
    }

    console.log(requestBody);
    fetch(this.url, {
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
      this.username = '';
      this. password = '';
      this. newCredential = '';
      if(this.showPasswordTable){
        this.showPasswordTable = false;
      }
      else{
        this.showUsernameTable = false;
      }
      this.showSettings = false;
      
    })
    .catch(error => {
      console.error('Error:', error);
    });

  }

  convertToISO(dateStr: string): string {
    const parts = dateStr.split(/[- :]/);
    const date = new Date(
      +parts[2],        
      +parts[1] - 1,    
      +parts[0],        
      +parts[3],        
      +parts[4],        
      +parts[5]         
    );

    return date.toISOString().slice(0, 19);
  }

  initDataEntry(){
    this.showForm = true;
    this.showSettings = false;
    this.frl = staticData.malampuzhaData.frl;
    this.grossStorage = staticData.malampuzhaData.grossStorage;

    const now = new Date();
    const offset = 5.5*60*60*1000;
    const istTime = new Date(now.getTime()+offset);

    this.date = istTime.toISOString().slice(0,16);

    var url = `${this.url}?action=getLatestStorage&sheetName=Malampuzha`;
    fetch(url, {
      method : 'GET',
    })
    .then(response => response.text())
    .then(data =>{
      var jsonData = JSON.parse(data);
      if(jsonData.value){
        this.lastStorage = jsonData.value;
      }      
    })
    this.viewData()
  }

  initSettings() {
    this.showSettings = true;
    this.showForm = false;
    this.showTable = false;
  }

  logOut(){
    this.authService.setLoginStatus(false);
    this.router.navigate(['/login']);
  }


  sendData(){

    this.isEntering = true;
    const percent = this.storage/this.grossStorage * 100;
    this.totalOutflow = this.powerhouse + this.spillway + this.otherOutflow + this.lbc + this.rbc; 
    this.totalInflow = this.storage - this.lastStorage + this.totalOutflow;
    
    if(this.totalInflow<0){
      this.totalInflow = 0;
    }
    if(!this.level || !this.storage){
      alert('Invalid Values!');
    }
    else{

      var requestBody = {
        action: 'dataEntry',
        sheetName: 'Malampuzha',
        date: this.date,
        level: this.level,
        frl: this.frl,
        urcLevel: this.urc,
        storage: this.storage,
        grossStorage: this.grossStorage,
        percent: percent,
        lbc: this.lbc,
        rbc: this.rbc,
        spillway: this.spillway,
        powerhouse: this.powerhouse,
        otherOutflow: this.otherOutflow,
        totalOutflow: this.totalOutflow,
        totalInflow: this.totalInflow,
        rainfall: this.rainfall,
        remarks:this.remarks,
        entryTime: new Date()
      }

      fetch(this.url, {
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
        return response.json();
      })
      .then(data => {
        alert(data.result);
        this.isEntering = false;
        this.viewData();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  } 
  
  setDateButton(){
    if(this.minDate == ''){
      this.disableDateButton = true;
    }
    else{
      this.disableDateButton = false;
    }
  }

  showCredentialsContainer(credential:string){

    if(credential=='username'){
      this.showUsernameTable = true;
      this.showPasswordTable = false;
    }
    else{
      this.showPasswordTable = true;
      this.showUsernameTable = false;
    }
  }
  
  updateData(){

    this.isEntering = true;
    const percent = this.storage/this.grossStorage * 100;
    this.totalOutflow = this.powerhouse + this.spillway + this.otherOutflow + this.lbc + this.rbc; 
    this.totalInflow = this.lastStorage - this.storage + this.totalOutflow;
    
    if(!this.level || !this.storage){
      alert('Invalid Values!');
    }
    else{

      var requestBody = {
        action: 'updateData',
        sheetName: 'Malampuzha',
        date: this.date,
        level: this.level,
        frl: this.frl,
        urcLevel: this.urc,
        storage: this.storage,
        grossStorage: this.grossStorage,
        percent: percent,
        lbc: this.lbc,
        rbc: this.rbc,
        spillway: this.spillway,
        powerhouse: this.powerhouse,
        otherOutflow: this.otherOutflow,
        totalOutflow: this.totalOutflow,
        totalInflow: this.totalInflow,
        rainfall: this.rainfall,
        remarks:this.remarks,
        entryTime: new Date()
      }

      fetch(this.url, {
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
        this.viewData();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

    this.showTable = false;
  };

  viewData(){

    const url = `${this.url}?action=getData&sheetName=Malampuzha`;
    fetch(url, {
      method : 'GET',
    })
    .then(response => response.text())
    .then(data =>{

      var jsonData = JSON.parse(data);
      this.displayData = jsonData.value;
      this.isTableVisible = true;
      if(this.displayData.length == 0){
        this.disableDateButton = false;
      }
      else{
        this.minDate = this.convertToISO(this.displayData[0]['date']);
        this.setDateButton(); 
      }
    })
    this.showTable = true;
    
    
  }
}
