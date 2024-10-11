"use client";
import { LivroI } from "@/utils/types/livros";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import { useForm } from "react-hook-form";

type Inputs = {
  descricao: string;
};

export default function Detalhes() {
  const params = useParams();
  const { cliente } = useClienteStore();

  const [livro, setLivro] = useState<LivroI>();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros/${params.livro_id}`);
      const dados = await response.json();
      // console.log(dados);
      setLivro(dados);
    }
    buscaDados();
  }, []);

  async function enviaComentarios(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/comentarios`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        clienteId: cliente.id,
        livroId: Number(params.livro_id),
        descricao: data.descricao
      })
    });
  }

  return (
    <>
      <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
          src={livro?.foto}
          alt="Foto do Carro"
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {livro?.titulo}
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {livro?.autor}
          </p>
          </div>
            
      </section>
    </>
  );
}

