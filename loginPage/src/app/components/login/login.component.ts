import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {gsap} from 'gsap';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements AfterViewInit{

  @ViewChild('login') login!:ElementRef
  @ViewChild('img') img!:ElementRef
  
 loginForm:FormGroup;
 constructor(private fb:FormBuilder,
  private authservice:AuthService,
  private snackBar: MatSnackBar
   ){
   this.loginForm = this.fb.group({
     userName:['' , Validators.required],
     password:['' , Validators.required],
   })
  }
  ngAfterViewInit(): void {
    gsap.from(this.login.nativeElement ,{
      duration : 2 ,
      x:-200, 
      opacity:0,
      ease:'back'
    })
    gsap.from(this.img.nativeElement ,{
      duration : 3 ,
      x:200, 
      opacity:0,
      ease:'back'
    })
  }

onSubmit(){
  const {userName , password} = this.loginForm.value;
  this.authservice.login(userName , password)
  .then(()=>{
    this.snackBar.open('Logged in successfully', 'Close', {
    duration: 3000,
    panelClass: ['snackbar-success']

  })})
  .catch((err)=>{
    this.snackBar.open('Login Failed : invalid Email or Password' , 'Close' , {
    duration:3000,
    panelClass: ['snackbar-failed']
  })});

  this.loginForm.reset();
}
}
