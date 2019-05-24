import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { CursoInterface } from '../models/cursoInterface';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';
import { cursorTo } from 'readline';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  cursosCollection: AngularFirestoreCollection<CursoInterface>;
  cursos: Observable<CursoInterface[]>;
  cursosF: Observable<CursoInterface[]>;
  cursoDoc: AngularFirestoreDocument<CursoInterface>;

  constructor(public afs:AngularFirestore) { 
    //this.cursos = afs.collection('cursos').valueChanges();
  /*  this.cursosCollection = this.afs.collection<CursoInterface>('cursos', ref => ref.where("tecnologia", "==", curso.tecnologia));
    this.cursos = this.cursosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CursoInterface;
        const id = a.payload.doc.id;
        return {id, ...data };
      }))
    ); */
  }

  getCursos(tec)
  {
  //  this.cursosCollection = this.afs.collection<CursoInterface>('cursos', ref => ref.where("tecnologia", "==", tec).where("precio", ">", "500"));
 // this.cursosCollection = this.afs.collection<CursoInterface>('cursos', ref => ref.where("tecnologia", "==", tec));  
  this.cursosCollection = this.afs.collection<CursoInterface>('cursos');
    this.cursos = this.cursosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CursoInterface;
        const id = a.payload.doc.id;
        return {id, ...data };
      }))
    );
    return this.cursos;
  }

  addCurso(curso: CursoInterface){
    console.log('Nuevo Curso');
    this.cursosCollection.add(curso);
  }

  deleteCurso(curso: CursoInterface){
    console.log('Borrar Curso');
    this.cursoDoc = this.afs.doc(`cursos/${curso.id}`)
    this.cursoDoc.delete();
  }

  updateCurso(curso: CursoInterface){
    console.log('Actualizar Curso');
    this.cursoDoc = this.afs.doc(`cursos/${curso.id}`);
    this.cursoDoc.update(curso);
  }
}
