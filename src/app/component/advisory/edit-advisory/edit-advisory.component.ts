import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Advisory } from 'src/app/models/advisory';
import { Service } from 'src/app/models/service';
import { Student } from 'src/app/models/student';
import { Teacher } from 'src/app/models/teacher';
import { AdvisoryService } from 'src/app/services/advisory.service';
import { ServiceService } from 'src/app/services/service.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-edit-advisory',
  templateUrl: './edit-advisory.component.html',
  styleUrls: ['./edit-advisory.component.css']
})
export class EditAdvisoryComponent implements OnInit {

  myForm!: FormGroup;
  advisory!: Advisory;
  idAdvisory: any;

  services: any[]=[];
  teachers: any[]=[];
  students: any[]=[];

  constructor(
    private fb: FormBuilder,
    private advisoryService: AdvisoryService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private serviceService: ServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
    this.getStudents();
    this.getTeachers();
    this.getServices();
    this.loadAdvisory();
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
          this.students=data;
        },
      });
    }
  
    getTeachers(): void {
      this.teacherService.getTeachers().subscribe({
        next: (data: Teacher[]) => {
          this.teachers=data;
        },
      });
    }
  
    getServices(): void {
      this.serviceService.getServices().subscribe({
        next: (data: Service[]) => {
          this.services=data;
        },
      });
    }

  loadAdvisory() {
    this.idAdvisory = this.route.snapshot.paramMap.get('id');
    this.advisoryService.getAdvisory(this.idAdvisory).subscribe((data) => {
      this.advisory = data;
      this.myForm = this.fb.group({
        idAdvisory: [this.advisory.idAdvisory],
        student: [this.advisory.student.idStudent],
        teacher: [this.advisory.teacher.idTeacher],
        serviceType: [this.advisory.serviceType.idServiceType],
        date: [this.advisory.date],
       
      });
    });
  }

  updateAdvisory(): void {
    const advisory: Advisory = {
      idAdvisory: parseInt(this.idAdvisory),
      student: {idStudent: parseInt(this.myForm.get('student')!.value)},
      teacher: {idTeacher: parseInt(this.myForm.get('teacher')!.value)},
      serviceType: {idServiceType: parseInt(this.myForm.get('serviceType')!.value)},
      date: this.myForm.get('date')!.value,
    };
    
     console.log(advisory);

    this.advisoryService
      .updateAdvisory(this.idAdvisory, advisory)
      .subscribe({
        next: (data) => {
          this.snackBar.open('La aesoria fue actualizada con exito!', '', {
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
