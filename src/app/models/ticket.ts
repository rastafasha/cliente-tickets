import { Evento } from "./evento";

export class Ticket {
    id!: number;
    client_id!: number;
    from_id!: number;
    company_id!: number;
    event_id!: number;
    event!: Evento;
    company!: any;
    referencia!: string;
    status!: string;
    monto!: string;
    fecha_inicio!: Date;
    fecha_fin!: Date;
    qr_code!: string;
}