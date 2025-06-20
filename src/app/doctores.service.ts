import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctoresService {
  
  empleados:Personal[]=plantilla;

  constructor() { }

  ngOnInit(): void {

  }

  getAll():Personal[]{
    return this.empleados;
  }

  getById(){}
  create(){}
  update(){}
  delete(){}

}
