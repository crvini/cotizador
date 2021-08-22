import { Component, Input, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { SrviceService } from 'src/app/Service/srvice.service';
import Swal from 'sweetalert2';

//const selectElemente = document.querySelector('paisori');

/*selectElemente.addEventListener('change', (event) => {
  const resultado = document.querySelector('.resultado');
  resultado.textContent = `Te gusta el sabor ${event.target.value}`;
});*/

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  pais: string;
  idC: number;
  data: any = {}
  descuento: any = {}
  tarifaP: any = {}
  obtenerTarifa: any = {}
  descuentoCliente: number;

  tarifaNueva: number = 0
  constructor(private servicio: SrviceService) {
    this.pais = "";
    this.idC = 0;
    this.descuentoCliente = 0;
  }
  nuevoForm = new FormGroup({
    idcliente: new FormControl(''),
    peso: new FormControl(''),
    ancho: new FormControl(''),
    alto: new FormControl(''),
    largo: new FormControl(''),
    paisDestino: new FormControl(' '),
    region: new FormControl(''),
    total: new FormControl(' '),
    nuevoCrear: new FormControl(' '),
  })
  ngOnInit(): void {
    this.nuevoForm.patchValue({
      'nuevoCrear': 'envio'
    })
  }
  //@Input() categoryId: string;
  descuentoC() {
    this.idC = this.nuevoForm.value["idcliente"]
    // console.log(this.idC);


    this.servicio.getDescuento(this.idC)
      .subscribe(respuesta => {
        this.descuento = respuesta as string[];

        return this.descuentoCliente = this.descuento[0].descuento


      })
  }

  getTarifaN() {

    this.pais = this.nuevoForm.value["paisDestino"]
    //console.log(this.pais);


    this.servicio.getTarifa(this.pais)
      .subscribe(respuest => {
        this.tarifaP = respuest as string

        return this.tarifaNueva = this.tarifaP[0].tarifa;
      })

  }

  getTotal() {
    this.data = this.nuevoForm.value
    let tarifaEnvio = this.tarifaNueva


    let descuento = this.descuentoCliente;
    let peso: number;
    let ancho: number;
    let alto: number;
    let largo: number;
    let total: number;

    peso = this.nuevoForm.value.peso;
    ancho = this.nuevoForm.value.ancho;
    alto = this.nuevoForm.value.alto;
    largo = this.nuevoForm.value.largo;
    //  (peso*tarifa) +1.66 *Alto*largo*ancho – descuento cliente *0.5*peso
    total = (peso * tarifaEnvio) + (1.66 * (alto * largo * ancho)) - (descuento * (0.5 * peso))


    let totalN = total.toFixed(2)
    // console.log(totalN);

    this.nuevoForm.patchValue({
      'total': totalN
    })

  }

  postFrom = async () => {

    this.data = this.nuevoForm.value
    //console.log(this.data)

    this.servicio.postCotizador(`http://localhost/apicotizador/index.php`, this.data)
      .subscribe(resp => {
        console.log(resp)
        Swal.fire(
          'Datos guardados correctamente',
          `El total del pedido fue: ${this.data['total']}`,
          'success'
        )
      })



  }


}
