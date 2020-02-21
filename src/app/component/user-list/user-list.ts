import {Component, HostListener, Injector, NgZone, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../../data.service';
import {ResultList} from '../../ResultList';
import {User} from '../../User';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  resList;
  data = [];
  isLoading = false;
  searchText = '';
  isShow: boolean;
  topPosToStartShowing = 100;

  constructor(
    private dataService: DataService, private router: Router, private injector: Injector
  ) { }

  ngOnInit() {

      this.isLoading = true;
      this.dataService.getUsers(1).subscribe(posts => {
        this.resList = posts;
        this.isLoading = false;
        this.data = posts.data;
    });
  }

    @HostListener('window:scroll', [])
    onWindowScroll() {

        // Logic for pagination
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

            if (!this.isLoading && this.resList.data.length < this.resList.total) {
                this.isLoading = true;
                this.dataService.getUsers((this.resList.data.length / 6) + 1).subscribe(res => {
                    this.resList.data = this.resList.data.concat(res.data);
                    this.data = this.data.concat(res.data);
                    this.isLoading = false;
                });
            }
        }

        // logic for showing floating button
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= this.topPosToStartShowing) {
            this.isShow = true;
        } else {
            this.isShow = false;
        }
    }

filterRes() {
      /* TODO Dear Reader, since we have paging in the list maybe a user does not exist on the current page but exist on other page. so, it should be shown
    * TODO So I thought i might call the user details api but that did not mentioned in the instructions */
    if (!this.searchText) { this.data = this.resList.data; } else {
        this.data = this.data.filter((user: User) =>
            user.id.toString().includes(this.searchText));
    }
}
gotoTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
}
