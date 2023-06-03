import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
})
export class AddTeacherComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      idTeacher: [''],
      firstName: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
      dni: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['',[Validators.required, Validators.email]],
      cellphone: ['',[Validators.required,Validators.minLength(9), Validators.maxLength(9)]],
    });
  }

  saveTeacher(): void {
    if (this.myForm.valid) {
    const teacher: Teacher = {
      idTeacher: 0,
      firstName: this.myForm.get('firstName')!.value,
      lastName: this.myForm.get('lastName')!.value,
      dni: this.myForm.get('dni')!.value,
      email: this.myForm.get('email')!.value,
      cellphone: this.myForm.get('cellphone')!.value,
    };

    this.teacherService.addTeacher(teacher).subscribe({
      next: (data) => {
        this.snackBar.open('¡El Profesor fue registrado con éxito!', '', {
          duration: 6000,
        });
        this.router.navigate(['/teachers']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
}
