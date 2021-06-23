import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/shared/models/user.model';
import { UserDao } from 'src/shared/services/user-dao.service';

@Component({
  selector: 'app-account-import',
  templateUrl: './account-import.component.html',
  styleUrls: ['./account-import.component.scss']
})
export class AccountImportComponent implements OnInit {
  @Output() usersImported = new EventEmitter();
  @Input() csv: any;
  errorMessage: string;
  isError = false;
  public users: User[] = [];
  reader = new FileReader();

  constructor(private userDao: UserDao, private http: HttpClient) { }

  ngOnInit(): void {
    const target: DataTransfer = <DataTransfer>(this.csv.target.files);

    this.reader.onload = (e: any) => {
      const userStrings: string[] = e.target.result.split("\n");
      userStrings.forEach(element => {
        const attributes: string[] = element.split(";");
        if (attributes[0]) {
          this.users.push({
            "firstname": attributes[0].toString(),
            "lastname": attributes[1].toString(),
            "email": attributes[2].toString(),
            "role": attributes[3].replace("\r", "")})
        }
      });
    }

    this.reader.readAsText(target[0]);
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
}
