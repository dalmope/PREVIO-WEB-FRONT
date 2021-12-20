import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompraService } from '../../../services/compra.service';

@Component({
  selector: 'app-ver-compra',
  templateUrl: './ver-compra.component.html',
  styleUrls: ['./ver-compra.component.css']
})
export class VerCompraComponent implements OnInit {

  id:any;
  compra :any=[]
  productos : any=[];

  constructor(private aRoutes:ActivatedRoute, private compras: CompraService) { }

  ngOnInit(): void {
    this.id = this.aRoutes.snapshot.paramMap.get('id');
    console.log(this.id)

    this.compras.obtenerCompra(this.id, localStorage.getItem('token')!).subscribe(data=>{
      this.compra=data;
      this.productos=data.productos;
    })
  }

}
