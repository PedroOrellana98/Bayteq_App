import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuarios: any = [];
  usuario: string;
  correo: string;

  constructor(
    private route:Router, private http:HttpClient) { }

  ngOnInit() {
    
  }

  async login(){
    const nombres = [];
    this.getUsers().subscribe(data => { 
        this.usuarios = data.filter(item => {
            return item.username === this.usuario && item.email === this.correo
        });
        if (this.usuarios.length != 0) {
          for(let i = 0; i <= this.usuarios.length-1; i++){
            nombres.push(this.usuarios[i].name);
            nombres.push(this.usuarios[i].username);
            nombres.push(this.usuarios[i].phone);
          }
          this.route.navigate(['tabs/home'], { queryParams: { user: nombres } });
        }
    });
  }

  getUsers(){
    return this.http
    .get('assets/files/users.json')
    .pipe(
      map((res:any) =>{
        return res.data
      }))
  }

}
