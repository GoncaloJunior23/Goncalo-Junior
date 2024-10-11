import { LivroI } from "@/utils/types/livros";
import Link from "next/link";

export function ItemLivros({data}: {data: LivroI}) {
  return (
    <div className="mt-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg"
        src={data.foto}
        alt={`Imagem do Livro ${data.titulo}`}
      />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.titulo}
        </h5>

        <p className="mb-3 text-sm font-bold text-gray-700 dark:text-gray-400">
          {data.autor}
        </p>
        <p className="mb-3 text-sm font-bold text-gray-700 dark:text-gray-400">
          {data.genero}
        </p>
        <p className="mb-3 text-sm font-bold text-gray-700 dark:text-gray-400">
          Código do Livro: {data.codigo}
        </p>
        <Link href={`/detalhes/${data.id}`}
          type="button"
          className="px-3 py-2 font-medium text-sm text-black bg-red-500 rounded-lg hover:bg-yallow-500 focus:ring-4 focus:outline-none focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-500 dark:focus:ring-red-500"
        >
          Sinopse
        </Link>
      </div>
    </div>
  );
}
