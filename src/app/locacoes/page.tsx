"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useClienteStore } from "@/context/cliente";
import { useState, useEffect } from "react";
import Link from "next/link";

type Locacao = {
  id: number;
  livroId: number;
  clienteId: number;
  datadaReserva: Date;
  datadaEntrega: Date;
  status: string;
};

export default function Locacoes() {
  const [locacoes, setLocacoes] = useState<Locacao[]>([]);
  const { cliente } = useClienteStore(); // Obtém o cliente logado do contexto

  useEffect(() => {
    async function getLocacoes() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/locacoes`
      );
      const dados = await response.json();

      // Filtra locações do cliente logado
      const locacoesCliente = dados.filter(
        (locacao: Locacao) => locacao.clienteId === cliente?.id
      );
      setLocacoes(locacoesCliente);
    }
    getLocacoes();
  }, [cliente]);

  return (
    <>
      <section className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Locações do Cliente:
          </h1>
          <Link
            href="/historico"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Voltar
          </Link>

        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {locacoes.map((locacao) => (
              <li key={locacao.id} className="p-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Id do Cliente: {locacao.clienteId}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Id do Livro: {locacao.livroId}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Data da Locação:{" "}
                  {new Date(locacao.datadaReserva).toLocaleDateString()}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Data de Devolução:{" "}
                  {new Date(locacao.datadaEntrega).toLocaleDateString()}
                </p>
                <p
                  className={`text-sm ${
                    locacao.status === "Locado"
                      ? "text-green-600"
                      : "text-red-600"
                  } dark:${
                    locacao.status === "Devolvido"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {locacao.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
