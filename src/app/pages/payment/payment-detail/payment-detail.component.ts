import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Payment } from '../../../models/payment';
import { PaymentService } from '../../../services/payment.service';
import { ImagenPipe } from '../../../pipes/imagen.pipe';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { EventoService } from '../../../services/evento.service';
import { Client } from '../../../models/client.model';
import { Evento } from '../../../models/evento';

@Component({
  selector: 'app-payment-detail',
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    // HeaderComponent, MenuFooterComponent,
     ImagenPipe,
    // LoadingComponent, 
    RouterModule
  ],
  templateUrl: './payment-detail.component.html',
  styleUrl: './payment-detail.component.scss'
})
export class PaymentDetailComponent implements OnInit, OnChanges {
@Input() pagoSeleccionado: any;

  pageTitle = "Detalle Pago";
  isLoading: boolean = false;
  isOpen = signal<boolean>(false); // Se mantiene como señal interna

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si llega un pago seleccionado válido desde el padre, abre el Offcanvas automáticamente
    if (changes['pagoSeleccionado'] && this.pagoSeleccionado) {
      this.isOpen.set(true); 
    }
  }

  cerrarOffcanvas() {
    this.isOpen.set(false);
  }

  
}
