import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SituacionActualComponent } from './situacion-actual/situacion-actual.component';
import { EvaluacionActivosComponent } from './evaluacion-activos/evaluacion-activos.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import { FormsModule } from '@angular/forms';
import { CriteriosComponent } from '../criterios/criterios.component';

@Component({
  selector: 'app-formulario',
  standalone: true,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class FormularioComponent {
  pasos = [SituacionActualComponent, ResultadosComponent, EvaluacionActivosComponent, RecomendacionesComponent, CriteriosComponent];
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
  rucTouched = false;

  camposValidos(): boolean {
    return this.isValidRUC(this.rucEmpresa)
      && this.nombreEmpresa.trim().length > 0
      && this.nombre.trim().length > 0
      && this.rol.trim().length > 0;
  }
  nivelesEvaluacionActivos = [
    'No implementado',
    'Implementado de forma mínima',
    'Implementado de manera parcial',
    'Implementado en gran medida',
    'Totalmente implementado'
  ];

  isValidRUC(ruc: string): boolean {
    // 1) once dígitos exactos
    if (!/^\d{11}$/.test(ruc)) return false;

    const pesos = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    const digitos = ruc.split('').map(Number);

    const suma = pesos.reduce((acc, peso, i) => acc + peso * digitos[i], 0);
    const resto = 11 - (suma % 11);
    const verificador = resto === 11 ? 1 : resto === 10 ? 0 : resto;

    return verificador === digitos[10];
  }

  respuestasSituacionActual = signal<Record<number, number>>({});
  respuestasEvaluacionActivos = signal<Record<number, number>>({});
  ngOnInit() {
    this.rucEmpresa = localStorage.getItem('rucEmpresa') || '';
    this.nombreEmpresa = localStorage.getItem('nombreEmpresa') || '';
    this.nombre = localStorage.getItem('nombre') || '';
    this.rol = localStorage.getItem('rol') || '';
    // this.respuestasEvaluacionActivos = signal<Record<number, number>>(JSON.parse(localStorage.getItem('respuestasEvaluacionActivos') || '{}'));
    // this.respuestasSituacionActual = signal<Record<number, number>>(JSON.parse(localStorage.getItem('respuestasSituacionActual') || '{}'));
  }
  iniciarEvaluacion() {
    localStorage.setItem('rucEmpresa', this.rucEmpresa);
    localStorage.setItem('nombreEmpresa', this.nombreEmpresa);
    localStorage.setItem('nombre', this.nombre);
    localStorage.setItem('rol', this.rol);
    this.pasoActual.set(4);
  }

  siguientePaso() {
    if (this.pasoActual() < this.pasos.length - 1) {
      this.pasoActual.update(p => p + 1);
    }
  }
  ultimoPaso() {
    this.pasoActual.set(4)
  }
  pasoAnterior() {
    if (this.pasoActual() > 0) {
      this.pasoActual.update(p => p - 1);
    }
  }
}
