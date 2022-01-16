import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from '../shared/pagination';
import { Repository } from '../shared/repository.model';

@Component({
  selector: 'app-repositories-section',
  templateUrl: './repositories-section.component.html',
  styleUrls: ['./repositories-section.component.scss'],
})
export class RepositoriesSectionComponent implements OnInit {
  @Input() title: String = 'My Repositories';
  @Input() userRepositories!: Repository[];
  @Input() paginationDetails!: Pagination;

  @Output() loadMoreReposEvent:EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  loadMoreRepos(){
    this.loadMoreReposEvent.emit();
  }

  showLoadMore(){
    return this.paginationDetails && this.paginationDetails.page != this.paginationDetails.pageCount;
  }
}
