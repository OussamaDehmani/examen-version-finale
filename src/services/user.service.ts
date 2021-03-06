import { Injectable } from '@angular/core';
import { Users } from '../app/modele/users';
import{FormGroup,FormControl,Validators}from"@angular/forms";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:3000/users";
  constructor(private http:HttpClient) { }
  user:Users[]=[];
  form:FormGroup = new FormGroup({
    id: new FormControl(null),
    nom: new FormControl('',Validators.required),
    prenom: new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
    tel: new FormControl('',Validators.minLength(8)),
    ville: new FormControl(''),
    statut: new FormControl(''),
    permission: new FormControl(''),
    pass: new FormControl(''),
    adresse: new FormControl('')});
    
    populateFormUtilisateur(row) {
      this.form.setValue(row);
      console.log(row);
    }
 

  add(user){
    return this.http.post<Users>(this.url, user);
  }
  delete(id){
    return this.http.delete(`${this.url}/${id}`);
  }
  update(user){
    return this.http.put(`${this.url}/${user.id}`, user);
  }

  getAll() {
    return this.http.get<Users[]>(this.url);
  }
}
