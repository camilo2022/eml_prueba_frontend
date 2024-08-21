import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../data/services/User.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../domain/models/User.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, MatInputModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  // inicializo el usuario del id
  userId: number = 0;
  // inicializo el objeto usuario para ingresar los datos
  user: User = new User();

  // importamos el servico de user y el router para redireccionar
  constructor(private userService:UserService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // obtenemos el parametro id que pasamos por la ruta y ejecutamos la funcion edit para obtener los datos del usuario
    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
      this.edit(this.userId);
    });
  }

  // edicion de usuario
  edit(id: number){  
    // llamamos al servicio para obtneer los datos
    this.userService.edit(id).subscribe(
      (success: any) => {
        // guardamos los datos en user para poder verla en el html
          this.user = success.data;
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
      }
    )
  }

  // actualizacion de usuario
  update(){
    // utilizacon swal para que el usuario confirme la accion
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirmar si deseas actualizar el usuario.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        // en caso de confirmar se llama al servicio al update delete y se actualiza el usurio
        this.userService.update(this.user, this.userId).subscribe(
          (success: any) => {
            // alerta de respuesta satisfactoria
            this.alertSwal('success', '¡Accion Exitosa!', 'Actualizacion del usuario exitosa.');
              this.index();
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
          }
        )
      } else {
        // en caso de no confirmar se muestra alerta de accion cancelada
        this.alertSwal('warning', '¡Accion cancelada!', 'Actualizacion del usuario cancelada.');
      }
    })
  }

  // navegacion a listado de usuarios
  index(){
    this.router.navigate(['Users']);
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
