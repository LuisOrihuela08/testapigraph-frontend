import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostsService } from '../service/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  posts : Post[] = [];

  constructor(private postService: PostsService){}


  ngOnInit(): void {
    this.getAllPost();
  }

  getAllPost(): void {
    this.postService.getpost().subscribe(
      (data: Post[]) => {
        this.posts = data;
        console.log('Publicaciones cargadas', this.posts);
      },
      (error) => {
        console.error('Error al cargar las publicaciones', error);
      }
    )
  }
}
