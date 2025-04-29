import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from '../formulario.component';
import { preguntasEvaluacionActivos } from '../utils/preguntas-evaluacion-activos';
import { recomendacionesEvaluacionActivos } from '../utils/recomendaciones';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-recomendaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recomendaciones.component.html',
  styleUrl: './recomendaciones.component.scss',
  providers: [DatePipe]
})
export class RecomendacionesComponent {
  public formulario = inject(FormularioComponent);
  respuestasEvaluacionActivos = this.formulario.respuestasEvaluacionActivos();
  niveles = this.formulario.nivelesEvaluacionActivos;
  cargando = false;
  vistaActual:
    | 'inicio'
    | 'identificar'
    | 'proteger'
    | 'detectar'
    | 'responder'
    | 'recuperar' = 'inicio';

  prioridadSeleccionada: 'alta' | 'media' | 'baja' = 'alta';

  constructor(private datePipe: DatePipe) {
    this.calcularEstrategiasPorFuncion();
  }
  getFechaHoy(): string {
    const today = new Date();
    return this.datePipe.transform(today, 'dd/MM/yyyy')!;
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
    this.cargando = true;
    let elementToPrint = document.querySelector('.pdf-export') as HTMLElement;
    if (!elementToPrint) return;
    const estabaOculto = elementToPrint.classList.contains('oculto');
    elementToPrint.classList.remove('oculto');
    elementToPrint.classList.add('modo-escritorio');
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 500));
    html2canvas(elementToPrint, { scale: 3 }).then((canvas) => {
      let pdf: jsPDF = new jsPDF('p', 'mm', 'a4');
      let imgWidth = 211 - 20;
      let pageHeight = 255;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let position = 10;
      let pageCanvasHeight = canvas.height * (imgWidth / canvas.width);
      let totalPages = Math.ceil(pageCanvasHeight / pageHeight);
      let ctx = canvas.getContext('2d');
      ctx!.imageSmoothingEnabled = false;

      for (let i = 0; i < totalPages; i++) {
        if (i != 0) {
          position = 20;
          pageHeight = 240;
        }
        let onePageCanvas = document.createElement('canvas');
        onePageCanvas.width = canvas.width;
        onePageCanvas.height = pageHeight * (canvas.width / imgWidth);
        let onePageCtx = onePageCanvas.getContext('2d');
        let startY = i * onePageCanvas.height;
        onePageCtx!.drawImage(canvas, 0, startY, canvas.width, onePageCanvas.height, 0, 0, canvas.width, onePageCanvas.height);
        onePageCtx!.imageSmoothingEnabled = false;
        let pageNumber = i + 1;
        pdf.setPage(pageNumber);
        let imageData = onePageCanvas.toDataURL('image/png', 1.0);
        pdf.addImage(imageData, 'PNG', 10, position, imgWidth, onePageCanvas.height * (imgWidth / canvas.width), undefined, 'FAST');
        if (i < totalPages - 1) {
          pdf.addPage();
        }
      }
      pdf.save('soyunpdf.pdf');
      location.reload();
      return false;
    });
  }
}
