import { Component, inject } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { CommonModule, NgIf } from '@angular/common';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-notificador',
  imports: [NgIf, CommonModule],
  templateUrl: './notificador.component.html',
  styleUrl: './notificador.component.scss'
})
export class NotificadorComponent {

  mensaje_ticket: string = '';

  mensaje: Payment | any;

  showNotificacion: boolean = false;
  user: any = null;

  private ticketService = inject(TicketService);
  private paymentService = inject(PaymentService);
  private authService = inject(AuthService);

  // Aquí puedes agregar lógica para mostrar notificaciones basadas en eventos del TicketService
  
  ngOnInit(): void {
    this.notificadorMensaje('');
    this.notificadorMensajeTicket('');
    
  }
// Por ejemplo, suscribirte a un observable que emita cuando aprueben el pago de la compra
  notificadorMensaje(msg: string){

    let USER = localStorage.getItem("user");
    this.user = USER ? JSON.parse(USER) : null;
    console.log(this.user)
    this.mensaje = msg;

    const svcAny = this.paymentService as any;
    if (svcAny.paymentApprovedObservable && typeof svcAny.paymentApprovedObservable.subscribe === 'function') {
      svcAny.paymentApprovedObservable.subscribe((payment: any) => {
        this.mensaje = `Pago aprobado: ${payment.referencia}`;
      });
    }

     this.paymentService.getPagosbyUser(this.user.id).subscribe((msg:any) => {
      this.mensaje = msg;
      // console.log(this.mensaje)

      if (this.mensaje[0].status === 'APPROVED' && this.mensaje[0].createdAt >= new Date(new Date().getTime() - 60000)) {
        this.showNotificacion = true;
        this.mensaje = `Pago aprobado: ${this.mensaje[0].referencia}`;
      }

      setTimeout(() => {
        this.showNotificacion = false;
      }, 5000); // Ocultar después de 5 segundos
    });

    
  }

// Por ejemplo, suscribirte a un observable que emita cuando llegue un nuevo ticket
  notificadorMensajeTicket(msg: string){
     const svcAny = this.ticketService as any;
    if (svcAny.newTicketObservable && typeof svcAny.newTicketObservable.subscribe === 'function') {
      svcAny.newTicketObservable.subscribe((ticket: any) => {
        this.showNotificacion = true;
        this.mensaje_ticket = `Recibiste un nuevo ticket: ${ticket.referencia}`;
      });
    }
  }

  closeNotificacion(){
    this.mensaje = '';
    this.mensaje_ticket = '';
    this.showNotificacion = false;
  }

  


}
