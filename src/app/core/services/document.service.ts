import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

constructor() { }

getSize(file: File): string {
  return Math.ceil(file.size / 1024 / 1024 ) + 'МБ';
}

}
