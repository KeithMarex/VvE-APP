import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
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
  errorMessage: string;
  fileLoaded: false;
  loadedFileName: string = "accounts";
  loadedFile: Blob;
  accounts: any[] = [];
  public userArray: User[] = [];

  constructor(private userDao: UserDao, private ngxCsvParser: NgxCsvParser, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onCreateUser(form: NgForm) {
    this.errorMessage = null;
    const formValues = form.value;

    const mailValid = this.validateEmail(formValues.email, formValues.confirmEmail);

    if (mailValid) {
      this.userDao.registerUser(formValues.email, formValues.firstname, formValues.lastname).subscribe(
        res => {
          this.usersImported.emit();
        },
        errorRes => {
          this.errorMessage = errorRes.error.message;
        }
      );
    }
    else {
      this.displayErrorMessage('Controleer of uw email op beide plekken correct is ingevoerd.');
    }
  }

  validateEmail(input: string, confirmInput: string): boolean {
    return input.includes('@') && input == confirmInput;
  }

  displayErrorMessage(message: string)
  {
    this.errorMessage = message;
  }

  onInputFile(form: NgForm) {
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
    const formValues = form.value;
    console.log(formValues.accounts)
    this.loadedFile = formValues.accounts;
    var reader = new FileReader();
    reader.readAsText(formValues.accounts)
    // console.log(this.ngxCsvParser.parse(formValues.accounts, { header: true, delimiter: ';' }))

    // this.ngxCsvParser.parse(formValues.accounts, { header: true, delimiter: ';' })
    //   .pipe().subscribe((result: Array<any>) => {

    //     console.log('Result', result);
    //     this.accounts = result;
    //   }, (error: NgxCSVParserError) => {
    //     console.log('Error', error);
    //   });
  }
}
