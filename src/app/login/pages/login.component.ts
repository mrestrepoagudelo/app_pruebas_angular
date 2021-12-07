import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { JwtService } from 'src/app/service/jwt.service';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  formLogin:FormGroup;

  constructor(
    private loginService:LoginService, 
    private messageService: MessageService,
    private jwtService:JwtService,
    private router:Router
  ) { 
    
    this.formLogin = new FormGroup({
      userName: new FormControl('mao',[
        Validators.required,
        Validators.minLength(3)
      ]),
      userPass :new FormControl('12345',[
        Validators.required,
        Validators.minLength(5)
      ])
    }); 
  }

  ngOnInit(): void {
  
  }

  onSubmit(event:Event){
    this.sendLogin();
  }

  sendLogin(){
    if(!this.formLogin.valid){
      this.messageService.add({severity:'warn', summary:'Info', detail:'Debes ingresar el Username y Password'});
      return;
    }

    this.loginService.login(this.formLogin.value).subscribe(
      (result:any)=>{
        this.jwtService.setToken(result.token);
        this.jwtService.setUserName(result.usuario.userName);
        this.router.navigate(["/mainApp"]);
      },
      error =>{
        this.messageService.add({severity:'error', summary:'Info', detail:error.error.message});
      }
    );
  }

}
