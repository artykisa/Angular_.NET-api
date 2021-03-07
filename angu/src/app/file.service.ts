import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}
  // tslint:disable-next-line:typedef
  public downloadXML() {
    return this.http.get('https://localhost:44395/users/downloadXML', { responseType: 'arraybuffer', headers: { Accept: 'application/xml'}});
  }
  // tslint:disable-next-line:typedef
  public downloadTXT(){
    return this.http.get('https://localhost:44395/users/downloadTXT', { responseType: 'arraybuffer', headers: { Accept: 'application/txt'}});
  }
  // tslint:disable-next-line:typedef
  public downloadGroupTXT() {
    return this.http.get('https://localhost:44395/users/downloadGroup', { responseType: 'arraybuffer', headers: { Accept: 'application/txt'}});
  }

  // tslint:disable-next-line:typedef no-shadowed-variable
  public downLoadFile(data: any, type: string) {
    const blob = new Blob([data], { type});
    const url = window.URL.createObjectURL(blob);
    // const pwa = window.open(url);
   // if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
    //  alert( 'Please disable your Pop-up blocker and try again.');
    // }
    const anchor = document.createElement('a');
    if (type === 'application/xml'){
      anchor.download = 'users.xml';
    }
    else {
      anchor.download = 'users.txt';
    }
    anchor.href = url;
    anchor.click();
  }
}
