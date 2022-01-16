import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RepositoriesSectionComponent } from './repositories-section/repositories-section.component';
import { RepositoryCardComponent } from './repository-card/repository-card.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TimeAgoPipe } from './time-ago.pipe';
import { PopularDirective } from './directives/popular.directive';
import { NgProgressModule } from 'ngx-progressbar';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserDetailsComponent,
    SearchBarComponent,
    RepositoriesSectionComponent,
    RepositoryCardComponent,
    FooterComponent,
    TimeAgoPipe,
    PopularDirective,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgProgressModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
