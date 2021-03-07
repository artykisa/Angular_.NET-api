import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {HttpService} from './http.service';
import {FileService} from './file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {

  users: string[] = [];
  values: string[] = ['10', '20', '30', '50'];
  pages: string[] = ['0', '1', '2', '3', '4'];
  title = 'Title';

   constructor(private httpService: HttpService, private fileSevice: FileService){ }
   ngOnInit(): void {
     /* tslint:disable:no-string-literal */
     this.httpService.getData().subscribe(data => {
       this.users = data as string[];
     });
}

  // tslint:disable-next-line:typedef
  onChange(event) {
    const newVal = event.target.value;
    this.httpService.setValue(newVal);
    this.ngOnInit();
    this.users = [];
  }

  // tslint:disable-next-line:typedef
  onChangePages(event) {
    const newVal = event.target.value;
    this.httpService.setPage(newVal);
    this.ngOnInit();
    this.users = [];
  }
  // tslint:disable-next-line:typedef
  onXmlDownload(){
    this.fileSevice.downloadXML().subscribe(response => this.fileSevice.downLoadFile(response, 'application/xml'));
   }

  // tslint:disable-next-line:typedef
  onTxtDownload(){
    this.fileSevice.downloadTXT().subscribe(response => this.fileSevice.downLoadFile(response, 'application/txt'));
  }

  // tslint:disable-next-line:typedef
  onGroupDownload() {
    this.fileSevice.downloadGroupTXT().subscribe(response => this.fileSevice.downLoadFile(response, 'application/txt'));
  }
}

