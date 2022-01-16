import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgProgressComponent } from 'ngx-progressbar';
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

  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent;

  constructor(
    private githubDataService: GithubDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.progressBar.color = 'white';
    this.fetchUserDetails();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.paginationDetails.page = 1;
        this.fetchUserDetails();
      }
    });
  }

  ngOnInit(): void {
    // this.fetchUserDetails();
  }

  async fetchUserDetails() {
    this.route.params.subscribe((params) => {
      if (params['username']) {
        this.username = params['username'];
      }
    });

    this.progressBar.start();

    await this.githubDataService.getUserDetails(this.username).subscribe({
      next: (details: User) => {
        this.userDetails = details;
        this.generatePagination();
      },
      error: () => {
        this.router.navigate(["error"])
      },
    });

    await this.fetchUserRepos();
  }

  fetchUserRepos(
    page: Number = this.paginationDetails.page,
    loadMore: Boolean = false
  ) {
    return this.githubDataService
      .getUserRepositories(this.username, page)
      .subscribe((repos: Repository[]) => {
        this.userRepositories = loadMore
          ? [...this.userRepositories, ...repos]
          : repos;

        this.paginationDetails.page = page;

        this.progressBar.complete();
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
