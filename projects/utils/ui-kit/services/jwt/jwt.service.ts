import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UkJwtService {
  public isTokenExpired(token: string | null): boolean {
    if (!token) return true;

    const decoded = jwtDecode(token);

    return decoded.exp! * 1000 < Date.now();
  }
}
