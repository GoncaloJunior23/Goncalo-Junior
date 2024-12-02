import { ClienteI } from "./clientes";
import { LivroI } from "./livros";

export interface ComentarioI {
    id: number
    cliente: ClienteI
    clienteId: number
    livroId: number
    livro: LivroI
    descricao: string
    resposta: string | null
    createdAt: string
    updatedAt: string | null
}