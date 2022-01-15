import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
} from '@angular/router';
import { GithubDataService } from '../services/github-data.service';
import { Repository } from '../shared/repository.model';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userDetails!: User;

  userRepositories!: Repository[];

  username: String = 'james-muriithi';

  constructor(
    private githubDataService: GithubDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.fetchUserDetails();
      }
    });
  }

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    this.route.params.subscribe((params) => {
      if (params['username']) {
        this.username = params['username'];
      }
    });

    this.githubDataService
      .getUserDetails(this.username)
      .subscribe((details: User) => {
        this.userDetails = details;
      });


    this.githubDataService
      .getUserRepositories(this.username)
      .subscribe((repos) => {
        this.userRepositories = repos;
      });
  }
}
