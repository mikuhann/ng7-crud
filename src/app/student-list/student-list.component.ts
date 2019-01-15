import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Student } from '../shared/student';
import { ToastrService } from 'ngx-toastr';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  p = 1; // pagination variable
  Student: Student[]; // save students data if students array
  hideWhenNoStudent = false; // hide students data table when no student.
  noData = false; //  show No Student Message, when no student in database.
  preLoader = true; // Showing Preloader

  constructor(
    public crudApi: CrudService,
    public  toastr: ToastrService
  ) { }

  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetStudentsList();
    s.snapshotChanges().subscribe( data => {
      this.Student = [];
      data.forEach( item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Student.push(a as Student);
      });
    });
  }
  dataState() {
    this.crudApi.GetStudentsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    });
  }
  deleteStudent(student) {
    if (window.confirm('Are sure you want to delete this student ?')) {
      this.crudApi.DeleteStudent(student.$key);
      this.toastr.success(student.firstName + 'successfully deleted!');
    }
  }
}
