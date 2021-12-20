import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ClientesService } from '../../../services/clientes.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {

  form!:FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientes : ClientesService,
    private toastr : ToastrService,
    private router : Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email : ["", Validators.required],
      nombre : ["", Validators.required],
      numeroTelefono : ["", Validators.required],
      estado : [true, Validators.required],
      cedula : ["", Validators.required]
    })
  }

  agregarCliente(){
    this.clientes.postCliente(localStorage.getItem('token')!, this.form.value).subscribe(data=>{
      this.toastr.success('Cliente Agregado Con Exito!', 'Registrado',{
        positionClass: 'toast-bottom-right'
      });
      this.router.navigateByUrl("/administracion/clientes");
    })
  }

}
