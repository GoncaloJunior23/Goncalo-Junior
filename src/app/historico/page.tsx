"use client";

import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import Link from "next/link";


type Historico = {
  id: number;
  livroId: number;
  clienteId: number;
  titulo: string;
  datadaReserva: Date;
  datadaEntrega: Date;
  renovacoes: number;
  status: string;
};

export default function Historico() {
  const [historicos, setHistoricos] = useState<Historico[]>([]);
  const { cliente } = useClienteStore(); // Obtém o cliente logado do contexto

  useEffect(() => {
    async function getHistoricos() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/historicos`
      );
      const dados = await response.json();

      // Filtra históricos do cliente logado
      const historicosCliente = dados.filter(
        (historico: Historico) => historico.clienteId === cliente?.id
      );
      setHistoricos(historicosCliente);
    }
    getHistoricos();
  }, [cliente]);

  return (
    <>
      <section className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Reservas do Cliente:
          </h1>
          <Link
            href="/locacoes"
            className="align-middle inline-flex items-center justify-center text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-inter rounded-lg text-semibold px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          >
            Locações
          </Link>
          <Link href="/reservar" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            Voltar
          </Link>

        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {historicos.map((historico) => (
              <li key={historico.clienteId} className="p-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Id do Cliente: {historico.clienteId}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Id do Livro: {historico.livroId}
                </p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Título: {historico.titulo}
                </h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Data da Reserva:{" "}
                  {new Date(historico.datadaReserva).toLocaleDateString()}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Data da Entrega:{" "}
                  {new Date(historico.datadaEntrega).toLocaleDateString()}
                </p>
                <div className="flex justify-end">
                  <Link
                    href="/renovacao"
                    className="align-middle inline-flex items-center justify-center text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-inter rounded-lg text-semibold px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                  >
                    Renovar
                  </Link>
                </div>
                <p
                  className={`text-sm ${
                    historico.status === "Reservado"
                      ? "text-green-600"
                      : "text-red-600"
                  } dark:${
                    historico.status === "Entregue"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {historico.status}
                </p>
                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Cancelar Reserva
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

