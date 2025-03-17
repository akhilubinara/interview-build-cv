import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviornments/enviornment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUserList(data: any){
    return this.http.get(this.baseUrl+`common/get-user-list?page=${data.page}&limit=${data.limit}`)
  }
  getUserDetails(userId: number){
    return this.http.get(this.baseUrl+`common/get-user-details?userId=${userId}`)
  }
  addUser(data: any) { 
    return this.http.post(this.baseUrl+`common/create-user`, data);
  }
}
