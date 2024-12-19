import { Component, OnInit } from '@angular/core';
import { PostsService } from '../service/posts.service';
import { Post } from '../models/post';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocialMediaService } from '../service/social-media.service';
import { Facebook } from '../models/facebook';
import { Instagram } from '../models/instagram';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {

  post: Post = new Post();
  postForm!: FormGroup;
  imageFile: File | null = null;

  constructor(private postService: PostsService,
    private socialMediaService: SocialMediaService,
    private fb: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.postForm = this.fb.group({
      caption: [this.post.caption, Validators.required],
      imageName: [null, Validators.required]
    });
  }

  //Metodo para manjera la seleccion de imagen
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.postForm.patchValue({
        imageName: file // Establece el archivo seleccionado en el formulario
      });
      this.postForm.get('imageName')?.updateValueAndValidity(); // Actualiza la validez del formulario
    }
  }

  createPost(): void {
    if (this.postForm.invalid || !this.imageFile) {
      alert('Por favor complete los campos');
      return
    }

    const formData = new FormData();
    formData.append('caption', this.postForm.value.caption);
    formData.append('imageName', this.imageFile, this.imageFile.name);

    this.postService.createpost(formData).subscribe({
      next: (response) => {
        alert('Publicación creada con éxito');
        //this.postForm.reset();
        this.imageFile = null;

        // Asignar la URL de la imagen obtenida del backend a `post.imageName`
        const imageUrl = response.imageName; // La respuesta ya incluye la URL completa de la imagen

        //Para compartir a las redes
        this.post.caption = this.postForm.value.caption;
        this.post.imageName = imageUrl;
        //this.post.imageName = `https://testapigraph-backend-production.up.railway.app/api/post/imagen/${response.imageName}`; // URL completa de la imagen
      },
      error: (err) => {
        console.error('Error al crear la publicación', err);
        alert('Hubo un error al crear la publicación');
      }
    })
  }

  shareToFacebook(): void {
    if (!this.post.caption || !this.post.imageName) {
      alert('No hay publicación para compartir en facebook');
      return;
    }
    const post: Facebook = {
      message: String(this.post.caption),
      //url: 'https://img.freepik.com/foto-gratis/vista-superior-mesa-llena-comida_23-2149209253.jpg?t=st=1734491835~exp=1734495435~hmac=0db2f4f9c0b434965309ae2f13c4ebd54289773c8f2e219a86be6818c3d7d559&w=1380'
      url: String(this.post.imageName) 
    };

    this.socialMediaService.postFacebook(post).subscribe({
      next: () => {
        alert('Publicación compartida en Facebook con éxito');
      },
      error: (err) => {
        console.error('Error compartiendo en Facebook:', err);
        alert('Hubo un error al compartir en Facebook');
      }
    });
  }

  shareToInstagram(): void {
    if(!this.post.caption || !this.post.imageName){
      alert('No hay publicación para compartir en Instagram');
      return;
    }
    const post: Instagram = {
      caption : String(this.post.caption),
      image_url : String(this.post.imageName)
      //image_url : 'https://img.freepik.com/foto-gratis/vista-superior-mesa-llena-comida_23-2149209253.jpg?t=st=1734491835~exp=1734495435~hmac=0db2f4f9c0b434965309ae2f13c4ebd54289773c8f2e219a86be6818c3d7d559&w=1380'
    };
    this.socialMediaService.postInstagram(post).subscribe({
      next: () => {
        alert('Publicación compartida en Instagram con éxito');
      },
      error: (err) => {
        console.error('Error compartiendo en Instagram', err);
        alert('Hubo un error al compartir en Instagram');
      }
    })
  }



}


