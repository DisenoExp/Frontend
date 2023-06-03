import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: boolean = false; // Variable para controlar si se muestra el mensaje de login fallido

  constructor(private fb: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.maxLength(50)]],
      contrasena: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onLoginFormSubmit(): void {
    // Lógica para manejar la acción de envío del formulario de login
    if (this.loginForm.valid) {
      // Realizar la autenticación y otras acciones necesarias
      if (this.validarCredenciales()) {
        console.log('Login exitoso'); // Mensaje en caso de login exitoso
        this.loginError = false; // Reiniciar el estado de loginError
        this.vet();
      } else {
        console.log('Login fallido'); // Mensaje en caso de login fallido
        this.loginError = true; // Mostrar el mensaje de login fallido
      }
    } else {
      // Mostrar mensajes de error o realizar otras acciones en caso de formulario no válido
      console.log('Formulario de login inválido');
    }
  }

  vet(){
    this.router.navigate(['header']);
  }
  validarCredenciales(): boolean {
    // Simulación de validación de credenciales (ejemplo)
    const usuario = this.loginForm.get('usuario').value;
    const contrasena = this.loginForm.get('contrasena').value;

    // Aquí puedes implementar la lógica real para validar las credenciales del usuario
    // por ejemplo, consultar a un servicio de autenticación, verificar en una base de datos, etc.

    // En este ejemplo, se valida que el usuario sea 'admin' y la contraseña sea 'password'
    return usuario === 'admin' && contrasena === '1234';
  }
}
