"use client";

import { useEffect, useState } from "react";


type Reserva = {
  id: number;
  titulo: string;
  dataReserva: string;
  status: string;
};

export default function Historico() {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    async function fetchReservas() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/reservas`
      );
      const dados = await response.json();
      setReservas(dados);
    }
    fetchReservas();
  }, []);

  return (
    <section className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        Histórico de Reservas:
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {reservas.map((reserva) => (
            <li key={reserva.id} className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {reserva.titulo}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Data da Reserva:{" "}
                {new Date(reserva.dataReserva).toLocaleDateString()}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Data da Entrega:{" "}
                {new Date(
                  new Date(reserva.dataReserva).setDate(
                    new Date(reserva.dataReserva).getDate() + 5
                  )
                ).toLocaleDateString()}
              </p>

              <p
                className={`text-sm ${
                  reserva.status === "Ativo" ? "text-green-600" : "text-red-600"
                } dark:${
                  reserva.status === "Ativo" ? "text-green-400" : "text-red-400"
                }`}
              >
                Status: {reserva.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
