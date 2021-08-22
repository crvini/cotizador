import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Cotizador } from '../Modelo/Cotizacion';
import { ResponseI } from '../Modelo/response.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SrviceService {


  constructor(private http: HttpClient) { }
  Url = 'http://localhost/apicotizador/index.php';

  public getCotizador(url: string) {
    return this.http.get(url);
  }




  public postCotizador(direccion: string, envio: any) {



    const formdata = new FormData();
    formdata.append("idcliente", envio['idcliente']);
    formdata.append("nuevoCrear", "envio");
    formdata.append("peso", envio['peso']);
    formdata.append("ancho", envio['ancho']);
    formdata.append("alto", envio['alto']);
    formdata.append("largo", envio['largo']);
    formdata.append("paisDestino", envio['paisDestino']);
    formdata.append("region", envio['region']);
    formdata.append("total", envio['total']);

    return this.http.post(direccion, formdata);

  }

  getDescuento(id: number) {

    const url = `http://localhost/apicotizador/index.php?cliente=${id}&ver=descuento`
    return this.http.get(url);

  }
  getTarifa(pais: string) {

    const url = `http://localhost/apicotizador/index.php?pais=${pais}&ver=pais`
    return this.http.get(url);

  }


}
