import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComentarioService, Comentario } from '../comentarioservice'; // Ajustá la ruta

@Component({
  selector: 'app-comentarios',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.css',
})
export class Comentarios implements OnInit{
  @Input() noticiaId!: number;
  
  comentarios: Comentario[] = [];
  comentarioForm!: FormGroup; // <-- Nuestro grupo de control reactivo

  constructor(
    private fb: FormBuilder,
    private comentarioService: ComentarioService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.noticiaId) {
      this.cargarComentarios();
    }
  }

  // Inicializamos el formulario reactivo con sus validaciones
  initForm(): void {
    this.comentarioForm = this.fb.group({
      autor: ['', [Validators.required, Validators.minLength(2)]],
      contenido: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  cargarComentarios(): void {
    this.comentarioService.getComentariosPorNoticia(this.noticiaId).subscribe({
      next: (data) => this.comentarios = data,
      error: (err) => console.error('Error al cargar comentarios', err)
    });
  }
enviarComentario(): void {
    // Si el formulario es inválido por las validaciones reactivas, no hacemos nada
    if (this.comentarioForm.invalid) return;

    // Armamos el objeto combinando los valores del formulario con el noticiaId
    const comentario: Comentario = {
      ...this.comentarioForm.value,
      noticiaId: this.noticiaId
    };

  this.comentarioService.agregarComentario(comentario).subscribe({
      next: (comentarioGuardado) => {
        this.comentarios.unshift(comentarioGuardado);
        
        // Reseteamos el formulario reactivo. 
        // Si querés dejar el nombre del autor fijo para que no tenga que escribirlo cada vez,
        // podés pasarle un valor por defecto al reset:
        this.comentarioForm.get('contenido')?.reset();
      },
      error: (err) => console.error('Error al guardar comentario', err)
    });
      }
  

}
