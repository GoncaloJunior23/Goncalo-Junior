import { ClienteI } from "./clientes"
import { LivroI } from "./livros"

export interface HistoricoI {
    id: number
    clienteId: number
    cliente: ClienteI
    livroId: number
    livro: LivroI
    titulo: string
    datadaReserva: Date
    status: string
    datadaEntrega: Date
}