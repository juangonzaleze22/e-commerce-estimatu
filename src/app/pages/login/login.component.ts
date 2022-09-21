import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {

    if (!this.myForm.invalid) {
      let data = {
        email: this.myForm.value.email,
        password: this.myForm.value.password
      }

      this.loading = true;

      this.global.postService("auth/login", data).subscribe(response => {
        this.loading = false;

        console.log(response);

        const message = response['message']
        const status = response['status']

        if (status == "EmailNotFound") {
          this.toastr.show(message)
        }
        if (status == "PasswordNotMatch") {
          this.toastr.show(message)
        }

        if (status == "success") {
          this.global.logIn(response["token"], response["data"]);
          this.router.navigate(['/']);
        }
        /*  else {
           this.toastr.show(this.app.lang('errorIniciarSesion'));
         } */

      })
    }
  }

  validError(field){ 
   return  this.myForm.get(field).invalid && (this.myForm.get(field).dirty || this.myForm.get(field).touched)
  }

}
