import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GithubDataService } from '../services/github-data.service';
import { Pagination } from '../shared/pagination';
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

  paginationDetails: Pagination = {
    page: 1,
    pageCount: 1,
    perPageRepos: 30,
  };

  username: String = 'james-muriithi';

  constructor(
    private githubDataService: GithubDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.paginationDetails.page = 1;
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
        this.generatePagination();
      });

    this.fetchUserRepos();
  }

  fetchUserRepos(
    page: Number = this.paginationDetails.page,
    loadMore: Boolean = false
  ) {
    this.githubDataService
      .getUserRepositories(this.username, page)
      .subscribe((repos: Repository[]) => {
        if (loadMore) {
          this.userRepositories.push(...repos);
        } else {
          this.userRepositories = repos;
        }

        this.paginationDetails.page = page;
      });
  }

  loadMoreRepos() {
    this.fetchUserRepos(+this.paginationDetails.page + 1, true);
  }

  generatePagination() {
    const userPublicRepos: Number = this.userDetails.public_repos;
    this.paginationDetails.pageCount = Math.ceil(
      +userPublicRepos / +this.paginationDetails.perPageRepos
    );
  }
}
