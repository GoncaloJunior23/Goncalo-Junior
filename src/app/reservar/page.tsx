"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useClienteStore } from "@/context/cliente";
import { useState } from "react";

type Inputs = {
  livroId: number;
  clienteId: number;
  datadaReserva: string; // Aceitar como string inicialmente
  titulo: string; // Adicionar título do livro
};

export default function Reservar() {
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const router = useRouter();
  const { logaCliente, cliente } = useClienteStore(); // Obtém o cliente logado do contexto
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);

  async function verificaReserva(data: Inputs) {
    // Converte campos numéricos
    data.livroId = parseInt(data.livroId as unknown as string, 10);
    data.clienteId = cliente?.id || 0; // Usa o id do cliente logado
    data.datadaReserva = new Date(data.datadaReserva).toISOString();
    // Converte a data para um objeto Date
    const datadaReservaFormatada = new Date(data.datadaReserva);

    console.log("Dados para envio:", { ...data, datadaReserva: datadaReservaFormatada }); // Log dos dados enviados
   
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/reservas`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            livroId: data.livroId,
            clienteId: data.clienteId,
            datadaReserva: data.datadaReserva,
            titulo: data.titulo // Adicionar título no envio
          }),
        }
      );

      console.log("Resposta recebida:", response); // Log da resposta recebida

      if (response.status === 201) {
        setMensagemSucesso("Reserva realizada com sucesso!");

        // Remove a mensagem de sucesso após alguns segundos
        setTimeout(() => {
          setMensagemSucesso(null);
          router.push("/historico"); // Redireciona para a página de histórico
        }, 5000); // 5 segundos
      } else {
        const error = await response.json();
        console.error("Erro ao criar reserva:", error); // Log do erro
        alert("Erro... DatadaReserva, ClienteId ou LivroId incorretos");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao se comunicar com o servidor. Tente novamente mais tarde.");
    }
  }

  // Define o valor padrão da data
  setValue("datadaReserva", new Date().toISOString().split("T")[0]);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="mt-10 h-48 w-48" src="./mulher.png" alt="logo" />
          </a>

          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            {mensagemSucesso && (
              <div className="mb-4 p-4 text-green-700 bg-green-100 rounded">
                {mensagemSucesso}
              </div>
            )}
            <form
              className="mt-5 max-w-sm mx-auto"
              onSubmit={handleSubmit(verificaReserva)}
            >
              <div className="mb-5 mt-5">
                <div className="mb-5">
                  <input
                    type="number"
                    id="livroId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    placeholder="Id do Livro"
                    required
                    {...register("livroId", { valueAsNumber: true })} // Garantir que é um número
                  />
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  id="titulo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  placeholder="Título do Livro"
                  required
                  {...register("titulo")}
                />
              </div>

              <div className="mb-5">
                <input
                  type="date"
                  id="datadaReserva"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  placeholder="Data da Reserva"
                  required
                  {...register("datadaReserva")}
                />
              </div>

              <button
                type="submit"
                className="align-middle inline-flex items-center justify-center text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-inter rounded-lg text-semibold px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
              >
                Reservar
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

