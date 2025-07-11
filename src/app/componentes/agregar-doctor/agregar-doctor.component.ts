import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Personal } from '../../models/personal';
import { DoctoresService } from '../../doctores.service';

@Component({
  selector: 'app-agregar-doctor',
  imports: [FormsModule],
  templateUrl: './agregar-doctor.component.html',
  styleUrl: './agregar-doctor.component.css'
})
export class AgregarDoctorComponent {

  mensajeExito:string='';
   
   medico: Personal = {

    id:0,
    nombre:'',
    especialidad:'',
    anios_experiencia:0,
    ciudad:'',
    telefono:'',
    foto:''
  };

constructor(private doctoresService:DoctoresService){  }

  // Esta propiedad NO forma parte del double binding del objeto trabajador
  esFemenino: boolean = false;

  asignarFotoAleatoria() {
    let genero;
    const id = Math.floor(Math.random() * 100);
    // Cambia el endpoint según el sexo
    if (this.esFemenino){
       genero = 'women'  ;
    }else{
       genero =   'men';
    }
    this.medico.foto = `https://randomuser.me/api/portraits/${genero}/${id}.jpg`;
  }

  guardar() {     
    this.doctoresService.create(this.medico);
    this.limpiar();
    console.log('Medico:', this.medico);
    console.log('¿Es femenino?:', this.esFemenino);
  }

  limpiar():void{
    this.medico = {
    id:0,
    nombre:'',
    especialidad:'',
    anios_experiencia:0,
    ciudad:'',
    telefono:'',
    foto:''
  };

  this.esFemenino = false;

  // Reiniciar el formulario
  // Mostrar mensaje de éxito
  this.mensajeExito = '¡Formulario enviado exitosamente!';

  // Ocultar después de 3 segundos
  setTimeout(() => {
    this.mensajeExito = '';
  }, 3000);
  }

}//fin de la clase
