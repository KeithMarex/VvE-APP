import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/shared/models/user.model';
import { UserDao } from 'src/shared/services/user-dao.service';
import { AccountListComponent } from '../account-list/account-list.component';

@Component({
  selector: 'app-account-import',
  templateUrl: './account-import.component.html',
  styleUrls: ['./account-import.component.scss']
})
export class AccountImportComponent implements OnInit {
  @Output() usersImported = new EventEmitter();
  @Input() csv: File;
  errorMessage: string;
  isError = false;
  newuser: User = {"firstname":"karel", "lastname":"karelsen", "email":"karelkarelsen@karel.kar", "role":"admin"};
  newuser1: User = {"firstname":"jan", "lastname":"jansen", "email":"janjansen@jan.jan", "role":"user"};
  newuser2: User = {"firstname":"piet", "lastname":"pietersen", "email":"pietpietersen@piet.pit", "role":"admin"};
  newuser3: User = {"firstname":"hans", "lastname":"hansen", "email":"hanshansen@hans.han", "role":"user"};
  public users: User[] = [];

  constructor(private userDao: UserDao, private http: HttpClient) { }

  ngOnInit(): void {
    this.users.push(this.newuser);
    this.users.push(this.newuser1);
    this.users.push(this.newuser2);
    this.users.push(this.newuser3);
  }

  onCreateUsers() {
    this.isError = false;
    this.errorMessage = null;
    
    this.userDao.registerUsers(this.users).subscribe(
      res => {
        this.usersImported.emit();
      },
      errorRes => {
        this.errorMessage = "Er is iets mis gegaan";
        this.isError = true;
      });
    }

  onDelete(user: User, index: number): void {
    this.users.splice(index,1);
  }

  // onInputFile(form: NgForm) {
  //   this.http.get('WebApp/src/app/account-management/assets/test-users.csv', {responseType: 'text'})
  //   .subscribe(
  //       data => {
  //         console.log(data)
  //           let csvToRowArray = data.split("\n");
  //           for (let index = 1; index < csvToRowArray.length - 1; index++) {
  //             let row = csvToRowArray[index].split(";");
  //             this.userArray.push({firstname: row[0], lastname: row[1], email: row[2], role: row[3]});
  //           }
  //           console.log(this.userArray);
  //       },
  //       error => {
  //           console.log(error);
  //       }
  //   );
  //   const formValues = form.value;
  //   console.log(formValues.accounts)
  //   this.loadedFile = formValues.accounts;
  //   var reader = new FileReader();
  //   reader.readAsText(formValues.accounts)
  //   console.log(this.ngxCsvParser.parse(formValues.accounts, { header: true, delimiter: ';' }))

  //   this.ngxCsvParser.parse(formValues.accounts, { header: true, delimiter: ';' })
  //     .pipe().subscribe((result: Array<any>) => {

  //       console.log('Result', result);
  //       this.accounts = result;
  //     }, (error: NgxCSVParserError) => {
  //       console.log('Error', error);
  //     });
  // }
}
