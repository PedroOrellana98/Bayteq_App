import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  usuario: any = [];
  valor: number

  constructor(private router: ActivatedRoute, private route:Router) { }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.usuario = params.user;
      this.redireccion(this.valor)
    }
  );
  }

  redireccion(valor){
    if (valor == 1) {
      this.route.navigate(['/tabs/home'], { queryParams: { user: this.usuario }});
    }else if (valor == 2){
      this.route.navigate(['/tabs/list'], { queryParams: { user: this.usuario }});
    }
  }

}
