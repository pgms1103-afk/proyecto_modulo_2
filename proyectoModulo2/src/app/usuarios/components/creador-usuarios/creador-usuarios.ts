import {Component, Input, Output, EventEmitter, OnInit, inject} from '@angular/core';
import {TrabajadorService} from '../../../services/trabajador.service';
import {ToastrService} from 'ngx-toastr';
import {UsuarioService} from '../../../services/usuario.service';

@Component({
  selector: 'app-creador-usuarios',
  standalone: false,
  templateUrl: './creador-usuarios.html',
  styleUrl: './creador-usuarios.css',
})
export class CreadorUsuarios implements OnInit{

  public usuarioService: UsuarioService = inject(UsuarioService);
  public toastr: ToastrService = inject(ToastrService);
  public cedula: number = 0;
  public nombre: string = '';
  public apellido: string = '';
  public correo: string = '';
  public contrasena: string = '';
  public tipoUsuario: string = '';
  public tarifa: number = 0;

  @Input() esVisible: boolean = false;
  @Output() alCerrar = new EventEmitter<void>();

  ngOnInit(): void {}

  crearUsuario() {
    this.usuarioService.postCrearUsuarios(
       this.cedula, this.nombre, this.apellido, this.correo, this.contrasena, this.tipoUsuario
    ).subscribe({
      next: (res) => {
        this.toastr.success('Usuario creado con éxito', 'Éxito');
        this.usuarioService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        console.log('mensaje error:', e.error);
        this.toastr.error(e.error, 'Error de creación');
      }
    });
  }
  cerrar() {
    this.alCerrar.emit();
  }
}
