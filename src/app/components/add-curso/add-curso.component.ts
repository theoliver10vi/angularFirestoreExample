import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../services/curso.service';
import { CursoInterface } from '../../models/cursoInterface';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent implements OnInit {
  curso: CursoInterface = {
    nombre: '',
    formador: '',
    precio: '',
    idioma: '',
    tecnologia: '',
    fecha: '',
    descripcion: ''
  };
  constructor(private cursoService: CursoService) { }

  ngOnInit() {
  }

  onGuardarCurso(myForm: NgForm){
    if(myForm.valid == true)
    {
      const fechaNow = "02/20/2019";
      this.curso.fecha = fechaNow;
      this.cursoService.addCurso(this.curso);
      myForm.resetForm();
    }
    else{
      console.log("Formulario no valido");
    }
  }

}
