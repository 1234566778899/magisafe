import { Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
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
export class EvaluacionActivosComponent implements OnInit {
  private formulario = inject(FormularioComponent);
  currentStep = 1;
  preguntasEvaluacionActivos = preguntasEvaluacionActivos;
  preguntas = preguntasEvaluacionActivos.map(d => d.categoria);
  anwers: any = {};
  niveles = this.formulario.nivelesEvaluacionActivos;
  respuestas = this.formulario.respuestasEvaluacionActivos;
  errores = signal<Record<number, boolean>>({});
  total = this.getTotal();
  getTotal(): number {
    let total = 0;
    for (let item of preguntasEvaluacionActivos) {
      total += item.preguntas.length;
    }
    return total;
  }
  ngOnInit(): void {

  }
  getProgressPercentage(): number {
    const procentage = (Object.keys(this.respuestas()).length / this.total) * 100;
    return procentage;
  }
  setStep(step: number) {
    this.currentStep = step;
  }
  actualizarRespuesta(preguntaId: number, nivel: number) {
    this.respuestas.update(r => ({ ...r, [preguntaId]: nivel }));
    this.errores.update(e => ({ ...e, [preguntaId]: false }));
    localStorage.setItem('respuestasEvaluacionActivos', JSON.stringify(this.respuestas()));
  }
  goBack() {
    this.formulario.pasoAnterior();
  }

  todasRespondidas(): boolean {
    return this.preguntasEvaluacionActivos.every(dimension =>
      dimension.preguntas.every(p => this.respuestas()[p.id] !== undefined)
    );
  }
  todasRespondidasBloque(): boolean {
    const res = this.preguntasEvaluacionActivos[this.currentStep - 1].preguntas.every(p => this.respuestas()[p.id] !== undefined);
    return res;
  }
  siguientePaso() {
    if (this.todasRespondidas()) {
      this.formulario.siguientePaso();
    } else {
      this.marcarErrores();
    }
  }

  @ViewChild('formContent') formContent!: ElementRef<HTMLDivElement>;
  private scrollToTop() {
    if (this.formContent) {
      this.formContent.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  intentarAvanzar() {
    if (this.currentStep < preguntasEvaluacionActivos.length) {
      if (this.todasRespondidasBloque()) {
        this.anwers[this.currentStep - 1] = true;
        this.scrollToTop();
        this.currentStep++;
      } else {
        this.marcarErrores();
      }
    } else {
      if (this.todasRespondidas()) {
        this.siguientePaso();
      } else {
        if (this.todasRespondidasBloque()) {
          this.anwers[this.currentStep - 1] = true;
          const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8];
          for (let step of steps) {
            if (!this.anwers[step]) {
              this.currentStep = step + 1;
              this.marcarErrores();
              break;
            }
          }
        } else {
          this.marcarErrores();
        }
      }
    }
  }

  private marcarErrores() {
    const nuevosErrores: Record<number, boolean> = {};
    preguntasEvaluacionActivos[this.currentStep - 1].preguntas.forEach(p => {
      if (this.respuestas()[p.id] === undefined) {
        nuevosErrores[p.id] = true;
      }
    });
    this.errores.set(nuevosErrores);
  }
}
