import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isPassword: boolean = true;
  myForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private global: GlobalService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue]
    }, { validator: this.passwordConfirming });
  }

  onSubmit() {
    this.loading = true;

    if (!this.myForm.invalid) {

      let data = {
        nombre: this.myForm.value.name,
        apellido: this.myForm.value.lastname,
        email: this.myForm.value.email,
        password: this.myForm.value.password,
        rol: 'client',
      }

      this.global.postService("auth/register", data).subscribe(reg => {

        if (reg["status"] == "EmailExist") {
          this.myForm.controls['email'].setErrors({ 'emailExist': true });
          this.toastr.show("Email already exists")
        }
        else if (reg["status"] == "success") {
          this.toastr.show("User created successfully");

          this.global.postService("auth/login", data).subscribe(response => {
            this.global.logIn(response["token"], response["data"]);
            this.router.navigate(['/']);
          })
        }
   
      },  (error) => { 
        console.log(error)
      }, () => { 
        this.loading = false;
      })
  }
}

passwordConfirming(c: AbstractControl): { invalid__password: boolean } {
  if (c.get('password').value !== c.get('confirm_password').value) {
    return { invalid__password: true };
  }
}

validError(field) {
  return this.myForm.get(field).invalid && (this.myForm.get(field).dirty || this.myForm.get(field).touched)
}

}
