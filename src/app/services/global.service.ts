import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { format } from 'date-fns';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private fooSubjet = new Subject<any>();

  public dataUser: any;
  isLoggedIn$ = new EventEmitter<boolean>();

  public IdAmin = "62e83d743bd6dd3957eb912f";
  public priceFootWallpaper = 6;
  public priceInchesWallpaper = 0.035;



  url = "https://api.mamidecor.com/api/";
  urlImage = "https://api.mamidecor.com/";
  //url = "http://localhost:7915/api/";
  //urlImage = "http://localhost:7915/";

  constructor(
    private http: HttpClient,
    private _router: Router
  ) {
    this.checkToken();
  }

  
  /* EVENTOS GLOBALES */
  publish(data: any){
    this.fooSubjet.next(data);
  }

  observable(): Subject<any> {
    return this.fooSubjet;
  }


  /* SERVICIOS */
  postService(service: string, data: any, tipo: number = 0){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    if(tipo == 1){
      if(localStorage.getItem("token") == null){
        localStorage.setItem("token", "");
      }
      headers = headers.set('Authorization', localStorage.getItem("token"));
    }
    return this.http.post(this.url+service, JSON.stringify(data), {headers: headers});
  }

  getService(service: string){
    return this.http.get(this.url+service);
  }

  private checkToken(): void{
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    isExpired ? this.logOut() : this.isLoggedIn$.emit(true);
  }

   getUser(){
    const userToken = localStorage.getItem('token');
    this.dataUser = JSON.parse(localStorage.getItem('userData'));
    console.log('user', this.dataUser);
    return this.dataUser;
  }

  /* LOGIN JWT */
  logIn(token: string, user: object): void{
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(user));
    this.getUser();
    this._router.navigate(['home'])
    this.isLoggedIn$.emit(true);
  }

  updateDataUser(user){ 
    localStorage.setItem('userData', JSON.stringify(user));
    this.dataUser = user;
    this.getUser();
  }

  logOut(){
    this.dataUser = undefined;
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    this.isLoggedIn$.emit(true);
  }

  formatDate(date){
    return date ? format(date, 'MM/dd/yyyy') : '';
  }
  
  getImg(path: string): string {

    let urlImg = "";

    if (path.indexOf("https://") == -1) {
      urlImg = this.url + path;
    }
    else {
      urlImg = path;
    }

    return urlImg;

  }

  prepareFormData(formData: FormData, file: File, name: string): FormData {
    formData.append(name, file, file.name);
    return formData;
  }

  calcDiscount(price, discount){
    if (discount == ''){
      return false;
    }
    const result = parseInt(price) - (parseInt(price) * (parseInt(discount) / 100));
    return result
  }

  isLogged(){ 
    const token = localStorage.getItem('token') || false;
    return token 
  }

}
