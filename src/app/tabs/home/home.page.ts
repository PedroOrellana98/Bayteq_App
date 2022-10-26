import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  nombre: string
  usuario: string
  telefono: string

  constructor(private route:Router, private router: ActivatedRoute,
    private alertController: AlertController) { }

  ngOnInit() {

    this.router.queryParams.subscribe(params => {
      this.nombre = params.user[0];
      this.usuario = params.user[1];
      this.telefono = params.user[2];
    }
  );
    
  }

  async salir(){
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

}
