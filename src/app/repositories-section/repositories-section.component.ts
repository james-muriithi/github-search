import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from '../shared/pagination';
import { Repository } from '../shared/repository.model';

@Component({
  selector: 'app-repositories-section',
  templateUrl: './repositories-section.component.html',
  styleUrls: ['./repositories-section.component.scss'],
})
export class RepositoriesSectionComponent implements OnInit {
  @Input() title: String = 'Repositories';
  @Input() userRepositories!: Repository[];
  @Input() paginationDetails!: Pagination;

  @Output() loadMoreReposEvent: EventEmitter<any> = new EventEmitter();

  mostPopularRepo!: Repository;

  loading: Boolean = false;

  constructor() {}

  ngOnInit(): void {
      
  }
  ngOnChanges(){
    this.loading = false;
    if (this.userRepositories?.length > 0) {
      this.mostPopularRepo = this.userRepositories.reduce((max, repo) =>
        max.stargazers_count >= repo.stargazers_count ? max : repo
      );
    }
  }

  loadMoreRepos() {
    this.loading = true;
    this.loadMoreReposEvent.emit();
  }

  showLoadMore() {
    return (
      !this.loading &&
      this.paginationDetails &&
      this.paginationDetails.page != this.paginationDetails.pageCount
    );
  }
}
