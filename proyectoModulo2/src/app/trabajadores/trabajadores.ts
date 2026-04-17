import { Component, inject } from '@angular/core';
import { TrabajadorService } from '../services/trabajador.service';
import { TrabajorModel } from '../models/trabajor.model';

@Component({
  selector: 'app-trabajadores',
  standalone: false,
  templateUrl: './trabajadores.html',
  styleUrl: './trabajadores.css',
})
export class Trabajadores {

  public trabajorService: TrabajadorService = inject(TrabajadorService);
  trabajadores: TrabajorModel[] = [];
  statuscode: number = 0;

  ngOnInit(): void {

    this.trabajorService.getTrabajadores().subscribe(
      {
        next: (response) =>{
          this.trabajadores = response.data as TrabajorModel[];
          console.log(response);
        }, error: error => {
          console.log(error);
        },
      }

    );

  }

}
