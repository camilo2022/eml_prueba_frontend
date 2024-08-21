import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../../../data/services/User.service';
import { Router } from '@angular/router';
import { User } from '../../../../domain/models/User.model';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [MatPaginatorModule, FormsModule, MatTableModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  dataTable: any = {
    column: 'names',
    dir: 'ASC',
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }

  // dataSource contiene la informacion de la tabla
  dataSource = new MatTableDataSource<User>();

  // displayedColumns contiene los encabezados de la tabla
  displayedColumns: string[] = ['id', 'names', 'last_names', 'number_phone', 'email', 'created_at', 'updated_at', 'deleted_at', 'actions'];
  
  // paginator contiene la informacion sobre la de la tabla para lazy loading
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  // importamos el servico de user y el router para redireccionar
  constructor(private userService:UserService, private router:Router) { }

  // ejecutamos al cargar la funcion index para que traiga los usuario
  ngOnInit(): void {
    this.index();
  }

  index(){
    // llamamos al servicio al metodo index y le pasamos la informacion de la paginacion con la pagina actual
    this.userService.index(this.dataTable, this.dataTable.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {
          // guardamos los datos en dataSource contiene la informacion de la tabla
          this.dataSource.data = response.data.users;

          // actualizacion la informacion de la paginacion de la tabla
          this.dataTable.total = response.data.meta.pagination.total;
          this.dataTable.count = response.data.meta.pagination.count;
          this.dataTable.per_page = response.data.meta.pagination.per_page;
          this.dataTable.current_page = response.data.meta.pagination.current_page;
          this.dataTable.total_pages = response.data.meta.pagination.total_pages;
        }
      },
      error => {
        console.error('ERROR DE INDEX', error);
      }
    )
  }

  // navegacion para el formulario de edicion
  edit(id: number): void {
    this.router.navigate(['/Users/Edit', id]);
  }

  // eliminacion de usuario
  delete(user: User){
    // utilizacon swal para que el usuario confirme la accion
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirmar si deseas eliminar el usuario.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        // en caso de confirmar se llama al servicio al metodo delete y se elimina el usurio
        this.userService.delete(user).subscribe(
          (response: any) => {
            if (response.error === false) {
              // alerta de respuesta satisfactoria
              this.alertSwal('success', '¡Accion Exitosa!', 'Eliminacion del usuario exitosa.');
              this.index();
            }
          },
          error => {
            // mensajes de errores
            let mensaje = 'Se encontraron errores:\n';
            if(error.error.errors){
              for (const campo in error.error.errors) {
                if (error.error.errors.hasOwnProperty(campo)) {
                  const mensajes = error.error.errors[campo];
                  for (const mensajeError of mensajes) {
                    mensaje += `${mensajeError}`;
                  }
                }
              }
            }else{
              mensaje += error.error.message;
            }
            // alerta de respuesta fallida
            this.alertSwal('error', '¡Accion Fallida!', mensaje);
            this.index();
          }
        )
      } else {
        // en caso de no confirmar se muestra alerta de accion cancelada
        this.alertSwal('warning', '¡Accion cancelada!', 'Eliminacion del usuario cancelada.');
      }
    })
  }

  // restauracion de usuario
  restore(user: User){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirmar si deseas restaurar el usuario.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, restaurar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        // en caso de confirmar se llama al servicio al metodo restore y se restaura el usurio
        this.userService.restore(user).subscribe(
          (response: any) => {
            if (response.error === false) {
              // alerta de respuesta satisfactoria
              this.alertSwal('success', '¡Accion Exitosa!', 'Restauracion del usuario exitosa.');
              this.index();
            }
          },
          error => {
            // mensajes de errores
            let mensaje = 'Se encontraron errores:\n';
            if(error.error.errors){
              for (const campo in error.error.errors) {
                if (error.error.errors.hasOwnProperty(campo)) {
                  const mensajes = error.error.errors[campo];
                  for (const mensajeError of mensajes) {
                    mensaje += `${mensajeError}`;
                  }
                }
              }
            }else{
              mensaje += error.error.message;
            }
            // alerta de respuesta fallida
            this.alertSwal('error', '¡Accion Fallida!', mensaje);
            this.index();
          }
        )
      } else {
        // en caso de no confirmar se muestra alerta de accion cancelada
        this.alertSwal('warning', '¡Accion cancelada!', 'Restauracion del usuario cancelada.');
      }
    })
  }

  // funcion de filtro para buscar coincidencia
  searchUsers(){
    // reiniciamos a la primera pagian y llamamos a index para consultar
    this.dataTable.current_page = 1;
    this.index();
  }

  // funcion para cambiar la pagina y traer los nuevos datos
  onPageChange(event: any) {
    this.dataTable.current_page = event.pageIndex + 1;
    this.dataTable.perPage = event.pageSize;
    this.index();
  }

  // funcion para mostrar alertas
  alertSwal(icon:any, title:string, text:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }
}
