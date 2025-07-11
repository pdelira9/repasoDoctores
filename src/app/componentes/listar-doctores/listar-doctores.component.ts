import { Component } from '@angular/core';
import { DoctoresService } from '../../doctores.service';
import { Personal } from '../../models/personal';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-listar-doctores',
  imports: [CommonModule],
  templateUrl: './listar-doctores.component.html',
  styleUrl: './listar-doctores.component.css'
})
export class ListarDoctoresComponent {
misDoctores!:Personal[];

  constructor(private doctoresService:DoctoresService){

  }

  ngOnInit(): void {
     this.misDoctores=this.doctoresService.getAll();
     console.log(this.doctoresService);


     //probando consulta por id   
     let doc;
     doc= this.doctoresService.getById(1794);
     console.log(doc);
     doc= this.doctoresService.getById(4212);
     console.log(doc);

     //probando eliminar por id 
      this.doctoresService.delete(4114);
      this.doctoresService.delete(5007);
      

  }
}
