import { LivroI } from "./livros";

export interface ComentarioI {
    id: number
    cliente: string
    livroId: number
    livro: LivroI
    descricao: string
    resposta: string | null
    createdAt: string
    updatedAt: string | null
}