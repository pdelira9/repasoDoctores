import { Injectable } from '@angular/core';
import plantilla from './data/plantilla.json';
import { Personal } from './models/personal';

@Injectable({
  providedIn: 'root'
})
export class DoctoresService {
  
  medicos:Personal[]=plantilla;

  constructor() { }

  ngOnInit(): void {
  
  }

    getAll():Personal[]{  //el metodo retora un arreglo del tipo de la interface Personal

    /*recuperaDatos es un arreglo del tipo de la interface Personal
    recuperaDatos se llena en automatico con los datos recuperados de localstorage almacenados bajo el nombre trabajadores
    localStorage.getItem recupera los datos de  localstorage almacenados bajo el nombre trabajadores  y luego
    les aplica un JSON.parse para pasarlor de formato texto a formato javascript
    La parte ?? '[]' indica que de NO exisitr datos en localstorage bajo el nombre de trabajadores entonces le
    asigne como valor un arreglo vacio al recuperarDatos*/

    const recuperaDatos: Personal[] = JSON.parse(localStorage.getItem('doctores') ?? '[]');
        
   
    /*si el arreglo de recuperarDatos tiene cero registros (porque no hay datos en localstorage)
    entonces el atributo empleados que es un arreglo toma como valor 
    toda la plantilla del archivo plantilla.json
    sino (else) el atributo empleados que es un arreglo toma como valor
    lo que tiene recuperarDatos (que es lo que se saco de localstorage)
    Recuerda que el arrreglo que se imprime en la vista es this.empleados
    */ 
    if (recuperaDatos.length === 0) { 
              this.medicos=plantilla;
    } 
    else{
        this.medicos=recuperaDatos;
    }
    return this.medicos;
  }


  /*Recibimos el id del empleado a consultar, vamos a retornar un objeto
  del tipo de la interface Personal con los datos de ese empleado o en su
  defecto un null porque ese id NO exist*/

  getById(idEmp: number): Personal | null {
    /*La constante encontrado guarda el objeto con los datos del empleado
      siempre y cuando este en el arreglo.
      
      La funcion find busca el primer elemento del arreglo this.empleados que cumpla con la condición: emp.id === idEmp
      y lo retorna si no lo encuentra devuelve undefined*/
    
      const encontrado = this.medicos.find(emp => emp.id === idEmp);
    
      return encontrado || null;  //Si encontrado tiene los datos del objeto lo retorna, SINO retorna null
  } //fin metodo getById
 
  
   
  delete(idEmp: number): void {
 
    /*La funcion findIndex busca el id del empleado en el arreglo si lo
  encuentra devuelve la posicion que ocupa ese empleado en el arreglo
  si no lo encuetra devuelve un -1, ese valor es almacenado en la constante
  index*/ 

  const index = this.medicos.findIndex(emp => emp.id === idEmp);
  if (index !== -1) {
    this.medicos.splice(index, 1); // Elimina el objeto del arreglo
    
    /* Actualiza el localStorage, setItem, almacena
       el arreglo this.empleados en el localstorage con el nombre de
       trabajadores, antes de grabar en localstorage con JSON.stringify cambia el
       formato del arreglo de javascript a formato texto*/
       
    localStorage.setItem('doctores', JSON.stringify(this.medicos)); 
  }
}  //fin del metodo delete


/*create es un metodo que agrega los datos de un nuevo empleado al arreglo de empleados y 
actualiza el localstorage*/

create(objeto: Personal): void {
  this.medicos.push(objeto); /*push agrega al arreglo de empleados, el objeto con los datos
  del empleado que llego como parametro*/

  /*setItem guarda el arreglo actualizado en el localstorage, con el nombre trabajadores*/
  localStorage.setItem('doctores', JSON.stringify(this.medicos)); // Guarda en localStorage
  }//fin del metodo create


/*update es un metodo que actualiza los datos de un   empleado en el arreglo de empleados y 
actualiza el localstorage*/

  update(objeto: Personal): void {
  /*findIndex busca si el id del objeto que llega como parametro se encuentra
  en el arreglo de empleados, de ser asi, guarda la posicion de ese empleado en el
  arreglo en la constante index, sino esta el id entonces en index se almacena un -1*/
  const index = this.medicos.findIndex(emp => emp.id === objeto.id);
  if (index !== -1) { //si index es diferente de -1 entonces procede la actualizacion de datos
    this.medicos[index] = objeto; /* Actualiza arreglo de empleados en la posicion index con los 
                                    datos del objeto que llego como parametro*/
    
  /*setItem guarda el arreglo actualizado en el localstorage, con el nombre trabajadores*/
  localStorage.setItem('doctores', JSON.stringify(this.medicos)); // Guarda en localStorage
  }//fin if

}//fin update

}//fin de la clase servicio