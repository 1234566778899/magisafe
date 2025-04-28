import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SituacionActualComponent } from './situacion-actual/situacion-actual.component';
import { EvaluacionActivosComponent } from './evaluacion-activos/evaluacion-activos.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class FormularioComponent {
  pasos = [SituacionActualComponent, ResultadosComponent, EvaluacionActivosComponent, RecomendacionesComponent];
  pasoActual = signal(-1);
  rucEmpresa = '';
  nombreEmpresa = '';
  nombre = '';
  rol = '';
  nivelesSituacionActual = [
    'No implementado',
    'Implementado de forma mínima',
    'Implementado de manera parcial',
    'Implementado en gran medida',
    'Totalmente implementado'
  ];
  camposValidos(): boolean {
    return this.rucEmpresa.trim().length > 0 && this.nombreEmpresa.trim().length > 0 && this.nombre.trim().length > 0 && this.rol.trim().length > 0;
  }
  nivelesEvaluacionActivos = [
    'No implementado',
    'Implementado de forma mínima',
    'Implementado de manera parcial',
    'Implementado en gran medida',
    'Totalmente implementado'
  ];

  respuestasSituacionActual = signal<Record<number, number>>({});
  respuestasEvaluacionActivos = signal<Record<number, number>>({});
  ngOnInit() {
    this.rucEmpresa = localStorage.getItem('rucEmpresa') || '';
    this.nombreEmpresa = localStorage.getItem('nombreEmpresa') || '';
    this.nombre = localStorage.getItem('nombre') || '';
    this.rol = localStorage.getItem('rol') || '';
  }
  iniciarEvaluacion() {
    localStorage.setItem('rucEmpresa', this.rucEmpresa);
    localStorage.setItem('nombreEmpresa', this.nombreEmpresa);
    localStorage.setItem('nombre', this.nombre);
    localStorage.setItem('rol', this.rol);
    this.pasoActual.set(0);
  }

  siguientePaso() {
    if (this.pasoActual() < this.pasos.length - 1) {
      this.pasoActual.update(p => p + 1);
    }
  }

  pasoAnterior() {
    if (this.pasoActual() > 0) {
      this.pasoActual.update(p => p - 1);
    }
  }
}
