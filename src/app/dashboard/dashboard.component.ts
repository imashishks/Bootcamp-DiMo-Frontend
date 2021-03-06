import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Imovie } from '../movie-component/movie-component.interface';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  moviesInfo: Imovie[];
  sections = ['Action', 'Adventure', 'Science Fiction', 'Fantasy', 'Romance'];
  constructor() {}

  ngOnInit(): void {}
}
