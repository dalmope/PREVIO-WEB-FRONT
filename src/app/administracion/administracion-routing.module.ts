import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { NuevoProductoComponent } from './pages/productos/nuevo-producto/nuevo-producto.component';
import { EditarProductoComponent } from './pages/productos/editar-producto/editar-producto.component';
import { NuevaCategoriaComponent } from './pages/categorias/nueva-categoria/nueva-categoria.component';
import { NuevoEmpleadoComponent } from './pages/empleados/nuevo-empleado/nuevo-empleado.component';
import { EditEmpleadoComponent } from './pages/empleados/edit-empleado/edit-empleado.component';
import { EditarCategoriaComponent } from './pages/categorias/editar-categoria/editar-categoria.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { NuevoClienteComponent } from './pages/clientes/nuevo-cliente/nuevo-cliente.component';
import { EditClienteComponent } from './pages/clientes/edit-cliente/edit-cliente.component';
import { ComprasProveedoresComponent } from './pages/compras-proveedores/compras-proveedores.component';
import { VerCompraComponent } from './pages/compras-proveedores/ver-compra/ver-compra.component';
import { NuevaCompraComponent } from './pages/compras-proveedores/nueva-compra/nueva-compra.component';

const routes: Routes = [
  {path:"", component:PrincipalComponent, children:[
    {path:"dashboard", component:DashboardComponent},
    {path:"empleados", component:EmpleadosComponent},
    {path:"nuevoEmpleado", component:NuevoEmpleadoComponent},
    {path:"empleado/edit/:id", component:EditEmpleadoComponent},
    {path:"categorias", component:CategoriasComponent},
    {path:"nuevaCategoria", component:NuevaCategoriaComponent},
    {path:"categoria/edit/:id", component:EditarCategoriaComponent},
    {path:"productos", component:ProductosComponent},
    {path:"nuevoProducto", component:NuevoProductoComponent},
    {path:"producto/edit/:id", component:EditarProductoComponent},
    {path:"proveedores", component:ProveedoresComponent},
    {path:"clientes", component:ClientesComponent},
    {path:"nuevoCliente", component:NuevoClienteComponent},
    {path:"cliente/edit/:id", component:EditClienteComponent},
    {path:"compraProveedores", component:ComprasProveedoresComponent},
    {path:"verCompra/:id", component:VerCompraComponent},
    {path:"nuevaCompra", component:NuevaCompraComponent},
    {path:"**", redirectTo:"dashboard"}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
