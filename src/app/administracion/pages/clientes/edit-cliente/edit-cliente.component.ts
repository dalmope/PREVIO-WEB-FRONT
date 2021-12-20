import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from 'src/app/administracion/services/clientes.service';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  form!:FormGroup;
  id:any;

  constructor(
    private fb: FormBuilder,
    private clientes : ClientesService,
    private toastr : ToastrService,
    private router : Router,
    private aRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.form = this.fb.group({
      email : ["", Validators.required],
      nombre : ["", Validators.required],
      numeroTelefono : ["", Validators.required],
      estado : [true, Validators.required],
      cedula : ["", Validators.required]
    })

    this.esEditarCliente();
  }

  esEditarCliente(){
    this.clientes.obtenerCliente(this.id, localStorage.getItem('token')!).subscribe(data=>{
      this.form.setValue({
        email : data.email,
        nombre: data.nombre,
        numeroTelefono : data.numeroTelefono,
        estado : data.estado,
        cedula : data.cedula
      })
    })
  }

  enviarData(){
    this.clientes.putCliente(localStorage.getItem('token')!, this.form.value, this.id).subscribe(data=>{
      this.toastr.success('Cliente Actualizado Con Exito!', 'Actualizado',{
        positionClass: 'toast-bottom-right'
      });
      this.router.navigateByUrl("/administracion/clientes");
    })
  }

}
