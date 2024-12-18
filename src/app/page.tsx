"use client";

import { InputPesquisa } from "@/components/InputPesquisa";
import { ItemLivros } from "@/components/ItemLivros";
import { LivroI } from "@/utils/types/livros";
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import { ReservaI } from "@/utils/types/reservas";
import { RenovacaoI } from "@/utils/types/renovacoes";
import { HistoricoI } from "@/utils/types/historicos";
import Link from "next/link";

export default function Home() {
  const [livros, setLivros] = useState<LivroI[]>([]);
  const { cliente,logaCliente } = useClienteStore();
  

  useEffect(() => {
    async function buscaCliente(idCliente: string) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`
      );
      if (response.status == 200) {
        const dados = await response.json();

        logaCliente(dados);
      }
    }
    if (localStorage.getItem("client_key")) {
      const clienteSalvo = localStorage.getItem("client_key") as string;
      buscaCliente(clienteSalvo);
    }

    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros`);
      const dados = await response.json();
      console.log(dados);
      setLivros(dados);
    }
    buscaDados();
  }, []);

  const listaLivros = livros.map((livro) => (
    <ItemLivros data={livro} key={livro.id} />
  ));

  return (
    <>


      <InputPesquisa setLivros={setLivros} />

      
      <div className="d-flex align-items-center justify-center">
        <img src="./bibli3.png" className="mx-auto mt-10 w-full" />
      </div>

      <div className="mx-auto max-w-screen-2xl flex justify-center">
        <h1 className="mt-5 mb-4 flex items-center text-5xl dark:text-black text-center">
        Sugestões de Leitura
      
        </h1>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {listaLivros}
      </section>

      <footer className="bg-vermelho rounded-lg shadow dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <ul className="flex flex-wrap items-center mb-6 text-sm font-inter text-black-500 sm:mb-0 dark:text-black-400 justify-between">
            <li className="flex-1 text-left pr-20">
              <Link
                href="/footer"
                className="cursor-pointer text-extrabold font-inter text-white dark:text-black hover:underline whitespace-nowrap"
              >
                Sobre o Ima
              </Link>
            </li>

            <li className="flex-1 text-center px-20">
              <Link
                href="/mario"
                className="cursor-pointer text-extrabold font-inter text-white dark:text-black hover:underline whitespace-nowrap"
              >
                Quem foi Mário Alves
              </Link>
            </li>

            <li className="flex-1 text-right pl-20">
              <Link
                href="/contato"
                className="cursor-pointer text-extrabold font-inter text-white dark:text-black hover:underline"
              >
                Contato
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-black-700 lg:my-8" />
        <span className="block text-semibold text-white sm:text-center dark:text-black-400">
          <a href="/" className="hover:underline me-5 mb-10">
            Instituto Mário Alves™ © 2024.Todos os Direitos Reservados.
          </a>
        </span>
      </footer>
    </>
  );
}
