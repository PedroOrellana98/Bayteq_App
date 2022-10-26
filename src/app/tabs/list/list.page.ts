import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  usuarios: any = [];

  constructor(private router: ActivatedRoute,
    private route: Router, private http: HttpClient,
    private alertController: AlertController) { }

  ngOnInit() {

    this.getUsers().subscribe(res => {
      this.usuarios = res;
    });
  }

  async salir() {
    const alert = await this.alertController.create({
      header: 'Seguro desea salir!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Si',
          role: 'confirm',
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role == "confirm") {
      this.route.navigate(['login']);
    }
  }

  getUsers() {
    return this.http
      .get('assets/files/users.json')
      .pipe(
        map((res: any) => {
          return res.data
        }))
  }

}
