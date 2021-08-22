import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Cotizador } from 'src/app/Modelo/Cotizacion';
import { SrviceService } from 'src/app/Service/srvice.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  public listarEnvios: any = []

  constructor(private service: SrviceService, private router: Router) { }

  ngOnInit(): void {
    this.cargarData();
  }

  public cargarData() {
    this.service.getCotizador(`http://localhost/apicotizador/index.php?ver=envio`)
      .subscribe(respuesta => {
        console.log(respuesta)
        this.listarEnvios = respuesta as string[];

      })
  }

}
