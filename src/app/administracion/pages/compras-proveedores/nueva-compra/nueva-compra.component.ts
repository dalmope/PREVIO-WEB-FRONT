import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ProductosService } from '../../../services/productos.service';
import { ProveedoresService } from '../../../services/proveedores.service';
import { ToastrService } from 'ngx-toastr';
import { CompraService } from '../../../services/compra.service';

@Component({
  selector: 'app-nueva-compra',
  templateUrl: './nueva-compra.component.html',
  styleUrls: ['./nueva-compra.component.css']
})
export class NuevaCompraComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  
  dtTrigger = new Subject<any>();
  form!:FormGroup;
  agregar!:FormGroup;
  prov!: FormGroup;
  selec!:FormGroup;

  productos:any=[]
  pedido:any=[];
  proveedores:any=[]

  constructor(
    private fb:FormBuilder,
    private producto : ProductosService,
    private proveedor : ProveedoresService,
    private toastr :ToastrService,
    private compra: CompraService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'
      }
    };

    this.proveedor.getProveedores(localStorage.getItem('token')!).subscribe(data => {
      this.proveedores = data;
    })


    this.producto.getProductos(localStorage.getItem('token')!).subscribe(data=>{
      this.productos=data;
      this.dtTrigger.next();
    })

    this.selec=this.fb.group({
      seleccion:["", Validators.required]
    })

    this.form=this.fb.group({
      numeroFactura : ["", Validators.required],
      proveedor : ["", Validators.required],
      productos : [[], Validators.required]
    })

    this.agregar = this.fb.group({
      cantidad: ["", Validators.required],
      cantidad_minima: [0, Validators.required],
      categoria: [0, Validators.required],
      estado: [true, Validators.required],
      id    : ["", Validators.required],
      iva   : ["", Validators.required],
      nombre: ["", Validators.required],
      precio: ["", Validators.required],
      retencion : ["", Validators.required]
    })

    this.prov = this.fb.group({
      seleccion: ["", Validators.required]
    })

    

  }

  buscar(id:any){
    this.producto.obtenerProducto(id, localStorage.getItem('token')!).subscribe(data=>{
      this.agregar.controls.id.setValue(data.id)
      this.agregar.controls.nombre.setValue(data.nombre);
    })
  }

  agregarProducto(){
    const pro ={
      id: this.agregar.value.id,
      nombre : this.agregar.value.nombre,
      cantidad : this.agregar.value.cantidad,
      iva : this.agregar.value.iva,
      precio : this.agregar.value.precio,
      retencion : this.agregar.value.retencion,
      cantidad_minima : 0,
      estado : true,
      categoria : 0,
    }

    if(this.pedido.find((e:any)=> e.id==pro.id)){
      this.toastr.warning('El producto ya esta en el carrito!', 'Warning',{
        positionClass: 'toast-bottom-right'
      });
    }else{
      this.pedido.push(pro);
    }
  }

  cambiar(){
    const selec = this.selec.value.seleccion;
    this.proveedor.getProveedor(selec, localStorage.getItem('token')!).subscribe(data=>{
      console.log(data)
      this.form.controls.proveedor.setValue(data.nombre);
    })
  }

  eliminar(id: any) {
    const indice = this.pedido.findIndex((e:any) => e.id_producto == id)
    this.pedido.splice(indice, 1);
    console.log(indice);
  }


  enviarPedido(){
    this.form.controls.productos.setValue(this.pedido);
    console.log(this.form.value)

    this.compra.postCompra(this.form.value, localStorage.getItem('token')!).subscribe(data=>{
      this.toastr.success('Compra Registrada Con Exito', 'Registrada',{
        positionClass: 'toast-bottom-right'
      });
    })
    
  }

}
