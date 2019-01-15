import { Injectable } from '@angular/core';
import { Student } from './student';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  studentsRef: AngularFireList<any>;
  studentRef: AngularFireObject<any>;
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }
  // create student
  AddStudent(student: Student) {
    this.studentsRef.push({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber
    });
  }
  // fetch single student object
  GetStudent(id: string) {
    this.studentRef = this.db.object('students-list/' + id);
    return this.studentRef;
  }
  // fetch students list
  GetStudentsList() {
    this.studentsRef = this.db.list('students-list');
    return this.studentsRef;
  }
  // update student object
  UpdateStudent(student: Student) {
    this.studentRef.update({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber
    });
  }
  // delete student object
  DeleteStudent(id: string) {
    this.studentRef = this.db.object('students-list/' + id);
    this.studentRef.remove();
  }
}
