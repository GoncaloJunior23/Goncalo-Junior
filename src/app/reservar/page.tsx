"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useClienteStore } from "@/context/cliente";
import Link from "next/link";

type Inputs = {
  codigodoCliente: string
  codigodoLivro: string
  datadaReserva: string
  
};

export default function Reservar() {
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();
  const { logaCliente } = useClienteStore();

  

  async function verificaReserva(data: Inputs) {
     //console.log(data)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/reservas/logReserva`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ 
          codigodoCliente: data.codigodoCliente,
          codigodoLivro: data.codigodoLivro,
          datadaReserva: data.datadaReserva,
         }),
      }
    );
     //console.log(response)
    if (response.status == 200) {
      const dados = await response.json();
      //alert("Ok")
      logaCliente(dados);
      router.push("/");
    } else {
      alert("Erro... Login ou Senha incorretos");
    }
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="mt-10 h-48 w-48" src="./mulher.png" alt="logo" />
          </a>
          
          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <form className="mt-5 max-w-sm mx-auto"
            onSubmit={handleSubmit(verificaReserva)}>
              <div className="mb-5 mt-5">
                <div className="mb-5">
                  <input
                    type="text"
                    
                    id="codigodoCliente"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    placeholder="Código do cliente"
                    required
                    {...register("codigodoCliente")}
                  />
                </div>
              </div>
  
              <div className="mb-5">
                <input
                  type="text"
                 
                  id="codigodoLivro"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  placeholder="Código do Livro"
                  required
                  {...register("codigodoLivro")}
                />
              </div>
  
              <div className="mb-5">
                <input
                  type="date"
                  id="datadaReserva"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  placeholder="Data da Reserva"
                  required
                  value={new Date().toISOString().split('T')[0]}
                  {...register("datadaReserva")}
                />
              </div>

  
              <Link
                href={`/reservar/${"livro_id"}`}
                type="button"
                className="align-middle inline-flex items-center justify-center text-black bg-red-700 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-semibold px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
              >
                Reservar
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  );
  
}
