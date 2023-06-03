import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Advisory } from 'src/app/models/advisory';
import { AdvisoryService } from 'src/app/services/advisory.service';
import { Student } from '../../../models/student';
import { Service } from '../../../models/service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { ServiceService } from 'src/app/services/service.service';
import { Teacher } from 'src/app/models/teacher';

@Component({
  selector: 'app-add-advisory',
  templateUrl: './add-advisory.component.html',
  styleUrls: ['./add-advisory.component.css'],
})
export class AddAdvisoryComponent implements OnInit {
  myForm!: FormGroup;

  services: any[] = [];
  teachers: any[] = [];
  students: any[] = [];

  constructor(
    private fb: FormBuilder,
    private advisoryService: AdvisoryService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private serviceService: ServiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
    this.getStudents();
    this.getTeachers();
    this.getServices();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      idAdvisory: [''],
      student: [''],
      teacher: [''],
      serviceType: [''],
      date: [new Date()],
    });
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
      },
    });
  }

  getTeachers(): void {
    this.teacherService.getTeachers().subscribe({
      next: (data: Teacher[]) => {
        this.teachers = data;
      },
    });
  }

  getServices(): void {
    this.serviceService.getServices().subscribe({
      next: (data: Service[]) => {
        this.services = data;
      },
    });
  }

  saveAdvisory(): void {
    const advisory: Advisory = {
      idAdvisory: 0,
      student: { idStudent: parseInt(this.myForm.get('student')!.value) },
      teacher: { idTeacher: parseInt(this.myForm.get('teacher')!.value) },
      serviceType: {
        idServiceType: parseInt(this.myForm.get('serviceType')!.value),
      },
      date: this.myForm.get('date')!.value,
    };

    this.advisoryService.addAdvisory(advisory).subscribe({
      next: (data) => {
        this.snackBar.open('La asesoria fue registrada con exito!', '', {
          duration: 6000,
        });
        this.router.navigate(['header/advisories']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
