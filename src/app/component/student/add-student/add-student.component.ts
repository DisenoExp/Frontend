import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
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
  saveStudent(): void {
    if (this.myForm.valid) {
      const student: Student = {
        idStudent: 0,
        firstName: this.myForm.get('firstName')!.value,
        lastName: this.myForm.get('lastName')!.value,
        dni: this.myForm.get('dni')!.value,
        email: this.myForm.get('email')!.value,
        cellphone: this.myForm.get('cellphone')!.value,
      };
  
      this.studentService.addStudent(student).subscribe({
        next: (data) => {
          this.snackBar.open('¡El estudiante fue registrado con éxito!', '', {
            duration: 6000,
          });
          this.router.navigate(['/students']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.snackBar.open('Por favor, complete todos los campos correctamente', '', {
        duration: 3000,
      });
    }
  }
}