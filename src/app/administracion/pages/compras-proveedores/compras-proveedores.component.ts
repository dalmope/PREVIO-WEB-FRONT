import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-compras-proveedores',
  templateUrl: './compras-proveedores.component.html',
  styleUrls: ['./compras-proveedores.component.css']
})
export class ComprasProveedoresComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  
  dtTrigger = new Subject<any>();

  compras : any [] = [];

  constructor(private compra: CompraService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'
      }
    };
    
    this.compra.getCompras(localStorage.getItem('token')!).subscribe(data=>{
      this.compras=data;
      this.dtTrigger.next();
    })
  }

}
