import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from '../formulario.component';
import { preguntasEvaluacionActivos } from '../utils/preguntas-evaluacion-activos';
import { recomendacionesEvaluacionActivos } from '../utils/recomendaciones';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-recomendaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recomendaciones.component.html',
  styleUrl: './recomendaciones.component.scss',
})
export class RecomendacionesComponent {
  private formulario = inject(FormularioComponent);
  respuestasEvaluacionActivos = this.formulario.respuestasEvaluacionActivos();
  niveles = this.formulario.nivelesEvaluacionActivos;

  vistaActual:
    | 'inicio'
    | 'identificar'
    | 'proteger'
    | 'detectar'
    | 'responder'
    | 'recuperar' = 'inicio';

  prioridadSeleccionada: 'alta' | 'media' | 'baja' = 'alta';

  constructor() {
    this.calcularEstrategiasPorFuncion();
  }

  cambiarVista(vista: typeof this.vistaActual) {
    this.vistaActual = vista;
  }

  desplegarControl: Record<string, boolean> = {};

  alternarDesglose(control: string) {
    this.desplegarControl[control] = !this.desplegarControl[control];
  }

  seleccionarPrioridad(prioridad: 'alta' | 'media' | 'baja') {
    this.prioridadSeleccionada = prioridad;
  }
  

  detalleEvaluacionActivos = this.calcularDetalle(
    this.respuestasEvaluacionActivos,
    preguntasEvaluacionActivos,
    this.niveles
  );

  calcularDetalle(
    respuestas: Record<number, number>,
    preguntas: {
      categoria: string;
      preguntas: { id: number; texto: string; controles: any[] }[];
    }[],
    niveles: string[]
  ) {
    return preguntas.map((cat) => {
      const detalle = cat.preguntas.map((p) => {
        const valor = respuestas[p.id];
        return {
          categoria: cat.categoria,
          texto: p.texto,
          respuesta: niveles[valor] ?? '—',
          puntaje: valor !== undefined ? valor + 1 : -1,
        };
      });
      return {
        categoria: cat.categoria,
        detalle,
      };
    });
  }

  private obtenerControlesConPuntajes(): {
    funcion: string;
    categoriaNIST: string;
    texto: string;
    puntajes: number[];
  }[] {
    const mapaControles: Record<string, {
      funcion: string;
      categoriaNIST: string;
      texto: string;
      puntajes: number[];
    }> = {};

    preguntasEvaluacionActivos.forEach((categoria) => {
      categoria.preguntas.forEach((pregunta) => {
        const respuesta = this.respuestasEvaluacionActivos[pregunta.id];
        if (respuesta !== undefined && Array.isArray(pregunta.controles)) {
          pregunta.controles.forEach((c) => {
            const { funcion, categoriaNIST, texto } = c;
            const key = `${texto}__${funcion}__${categoriaNIST}`;
            if (!mapaControles[key]) {
              mapaControles[key] = {
                funcion,
                categoriaNIST,
                texto,
                puntajes: [],
              };
            }
            mapaControles[key].puntajes.push(respuesta + 1);
          });
        }
      });
    });

    return Object.values(mapaControles);
  }

  controlesConPuntajes = this.obtenerControlesConPuntajes();
  recomendaciones = Array.from(
    new Map(
      this.controlesConPuntajes.map((control) => {
        const promedio = control.puntajes.reduce((acc, val) => acc + val, 0) / control.puntajes.length;
        const nivelRedondeado = Math.round(promedio);
  
        const match = recomendacionesEvaluacionActivos.find(
          (r) =>
            r.control.trim().toLowerCase() === control.texto.trim().toLowerCase() &&
            r.funcion.trim().toLowerCase() === control.funcion.trim().toLowerCase()
        );
  
        const textoRecomendacion = match?.recomendacion.find(
          (rec) => rec.nivelMadurez === nivelRedondeado
        )?.texto;
  
        const clave = `${control.texto.trim().toLowerCase()}__${control.funcion.trim().toLowerCase()}`;
  
        return [
          clave,
          {
            control: control.texto.trim(),
            nivel: nivelRedondeado,
            funcion: control.funcion.trim(),
            categoriaNIST: control.categoriaNIST.trim(),
            texto: textoRecomendacion?.trim() ?? '',
          },
        ];
      })
    ).values()
  );
  
  get recomendacionesFiltradas() {
    return this.recomendaciones.filter(
      (r) =>
        r.funcion === this.vistaActual.toUpperCase() &&
        r.nivel < 5 &&
        r.texto.trim() !== '' &&
        this.filtrarPorPrioridad(r.nivel)
    );
  }

  filtrarPorPrioridad(nivel: number): boolean {
    if (this.prioridadSeleccionada === 'alta') return nivel < 2.5;
    if (this.prioridadSeleccionada === 'media') return nivel >= 2.5 && nivel < 4;
    return nivel >= 4;
  }

  estrategiasPorFuncion: {
    funcion: string;
    recomendaciones: {
      control: string;
      texto: string;
      prioridad: string;
    }[];
  }[] = [];

  private calcularEstrategiasPorFuncion() {
    const agrupado = new Map<
      string,
      {
        control: string;
        texto: string;
        prioridad: string;
      }[]
    >();
  
    for (const r of this.recomendaciones) {
      if (r.nivel >= 5 || !r.texto.trim()) continue;
  
      let prioridad: 'alta' | 'media' | 'baja';
      if (r.nivel < 2.5) prioridad = 'alta';
      else if (r.nivel < 4) prioridad = 'media';
      else prioridad = 'baja';
  
      const lista = agrupado.get(r.funcion) ?? [];
      lista.push({
        control: r.control,
        texto: r.texto,
        prioridad,
      });
      agrupado.set(r.funcion, lista);
    }
  
    this.estrategiasPorFuncion = Array.from(agrupado.entries()).map(
      ([funcion, recomendaciones]) => ({
        funcion,
        recomendaciones,
      })
    );
  }
  
  async descargarResultados() {
    const element = document.querySelector('.pdf-export') as HTMLElement;
    if (!element) return;
  
    const originalStyle = element.style.cssText;
    const estabaOculto = element.classList.contains('oculto');
  
    // Mostrar temporalmente
    element.classList.remove('oculto');
    element.classList.add('modo-escritorio');
    window.scrollTo(0, 0);
  
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      scrollY: -window.scrollY,
    }).then((canvas) => {
      // Restaurar visibilidad
      if (estabaOculto) element.classList.add('oculto');
      element.classList.remove('modo-escritorio');
      element.style.cssText = originalStyle;
  
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
  
      if (imgHeight > pdf.internal.pageSize.getHeight()) {
        let position = 0;
        while (position < imgHeight) {
          pdf.addImage(imgData, 'JPEG', 0, -position, pdfWidth, imgHeight);
          position += pdf.internal.pageSize.getHeight();
          if (position < imgHeight) pdf.addPage();
        }
      } else {
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
      }
  
      pdf.save('estrategias-por-funcion.pdf');
    });
  }
}
