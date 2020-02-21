import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../data.service';
import {User} from '../../User';
import {Location} from '@angular/common';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
    user: User;
    isLoading = false;
    constructor(
        private router: Router,
        private location: Location,
        private activatedRoute: ActivatedRoute, private service: DataService) {
    }

        ngOnInit(): void {
            this.isLoading = true;
            const id = this.activatedRoute.snapshot.url[1].path;
            this.service.getUserDetails(id).subscribe(user => {
              this.user = user;
              this.isLoading = false;
              console.log(this.user);
            });
  }

  goBackToList() {
      this.location.back();
  }

}
