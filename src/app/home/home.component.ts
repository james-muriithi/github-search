import { Component, OnInit } from '@angular/core';
import { GithubDataService } from '../services/github-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private githubDataService: GithubDataService) {}

  ngOnInit(): void {
    // this.githubDataService
    //   .getUserDetails('jame')
    //   .subscribe((details) => {
    //     console.log(details);
    //   });
    this.githubDataService.getUserRepositories('james-muriithi').subscribe((details) => {
      console.log(details);
    });
  }
}
