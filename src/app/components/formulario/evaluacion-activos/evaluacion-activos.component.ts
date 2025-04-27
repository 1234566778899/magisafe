import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from '../formulario.component';
import { preguntasEvaluacionActivos } from '../utils/preguntas-evaluacion-activos';

@Component({
  selector: 'app-evaluacion-activos',
  standalone: true,
  templateUrl: './evaluacion-activos.component.html',
  styleUrl: './evaluacion-activos.component.scss',
  imports: [CommonModule, FormsModule]
})
export class EvaluacionActivosComponent implements OnInit{
  private formulario = inject(FormularioComponent);

  preguntasEvaluacionActivos = preguntasEvaluacionActivos;

  niveles = this.formulario.nivelesEvaluacionActivos;

  respuestas = this.formulario.respuestasEvaluacionActivos;
  errores = signal<Record<number, boolean>>({});

  ngOnInit(): void {
    console.log("Componente cargado. Respuestas actuales:", this.respuestas());
  }

  actualizarRespuesta(preguntaId: number, nivel: number) {
    this.respuestas.update(r => ({ ...r, [preguntaId]: nivel }));
    this.errores.update(e => ({ ...e, [preguntaId]: false }));
    console.log("Respuestas actualizadas:", this.respuestas());
  }

  todasRespondidas(): boolean {
    return this.preguntasEvaluacionActivos.every(dimension =>
      dimension.preguntas.every(p => this.respuestas()[p.id] !== undefined)
    );
  }

  siguientePaso() {
    if (this.todasRespondidas()) {
      console.log("Todas las respuestas han sido completadas. Avanzando...");
      this.formulario.siguientePaso();
    } else {
      console.warn("No se puede avanzar: hay preguntas sin responder.");
      this.marcarErrores();
    }
  }

  intentarAvanzar() {
    if (this.todasRespondidas()) {
      this.siguientePaso();
    } else {
      console.warn("Errores encontrados.");
      this.marcarErrores();
      console.log("Respuestas incompletas:", this.respuestas());
    }
  }

  private marcarErrores() {
    const nuevosErrores: Record<number, boolean> = {};
    this.preguntasEvaluacionActivos.forEach(categoria => {
      categoria.preguntas.forEach(p => {
        if (this.respuestas()[p.id] === undefined) {
          nuevosErrores[p.id] = true;
        }
      });
    });
    this.errores.set(nuevosErrores);
  }
}
