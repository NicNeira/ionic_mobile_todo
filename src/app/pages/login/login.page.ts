import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonInput, IonInputPasswordToggle, IonRow, IonText, IonToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,IonContent, CommonModule, FormsModule,IonCard, IonCardHeader, IonCardTitle, 
    IonCardSubtitle, IonCardContent, IonInput, IonButton, IonToggle, IonInputPasswordToggle, 
    IonRow, IonCol, IonText]
})
export class LoginPage implements OnInit {
  form!:FormGroup

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),

      password:new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
    })
  }


  goToRegister(){
    this.router.navigate(['/register'])
  }
  
  validar(){
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return
    }
    const {email,password} = this.form.value
    console.log("Email",email)
    console.log("password",password)
    
    this.router.navigate(['/todo-list'])

  }
}
