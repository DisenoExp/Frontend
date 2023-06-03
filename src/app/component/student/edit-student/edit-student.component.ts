import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  myForm!: FormGroup;
  student!: Student;
  idStudent: any;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
    this.loadStudent();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      idStudent: [''],
      firstName: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
      dni: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['',[Validators.required, Validators.email]],
      cellphone: ['',[Validators.required,Validators.minLength(9), Validators.maxLength(9)]],
    });
  }

  loadStudent() {
    this.idStudent = parseInt(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudent(this.idStudent).subscribe((data) => {
      this.student = data;
      this.myForm.patchValue({
        idStudent: this.student.idStudent,
        firstName: this.student.firstName,
        lastName: this.student.lastName,
        dni: this.student.dni,
        email: this.student.email,
        cellphone:this.student.cellphone,
      });
    });
  }

  updateStudent(): void {
    if (this.myForm.invalid) {
      // Si el formulario es inválido, se muestra un mensaje de error y se detiene la actualización del estudiante.
      this.snackBar.open('Por favor complete correctamente todos los campos', '', {
        duration: 3000,
      });
      return;
    }
    const student: Student = {
      idStudent: parseInt(this.idStudent),
      firstName: this.myForm.get('firstName')!.value,
      lastName: this.myForm.get('lastName')!.value,
      dni: this.myForm.get('dni')!.value,
      email: this.myForm.get('email')!.value,
      cellphone: this.myForm.get('cellphone')!.value,
    };
    this.studentService.updateStudent(this.idStudent, student).subscribe({
      next: (data) => {
        this.snackBar.open('Los datos se actualizaon con exito!', '', {
          duration: 6000,
        });
        this.router.navigate(['header/students']);
      },
      error: (err) => {
        console.log(err);
      },
    });}
}  