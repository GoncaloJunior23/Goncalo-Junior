"use client";

import Link from "next/link";
import { useClienteStore } from "@/context/cliente";
import { useRouter } from "next/navigation";

export function Header() {
  const { cliente, deslogaCliente } = useClienteStore();
  const router = useRouter();

  function sairCliente() {
    deslogaCliente();
    if (localStorage.getItem("client_key")) {
      localStorage.removeItem("client_key");
    }
    router.push("/login");
  }

  return (
    <nav className="border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./vermelho.png" className="h-16" alt="Biblioteca IMA" />
          <span className="self-center text-3xl font-inter whitespace-nowrap dark:text-white">
            Instituto Mário Alves
          </span>
        </a>

        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {cliente.id ? (
            <>
              {/* <div className="flex items-center justify-center space-x-6 rtl:space-x-reverse">
                <Link
                  href={"/reservar"}
                  className="mt-5 flex-1 align-items-center justify-center w-full text-white bg-vermelho hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-inter rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Reservar
                </Link>

                <Link
                  href={"/renovacao"}
                  className="mt-5 flex-1 align-items-center justify-center w-full text-white bg-vermelho hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-inter rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Renovar
                </Link> */}

                <Link
                  href="/historico"
                  className="mt-5 flex-1 align-items-center justify-center w-full text-white bg-vermelho hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-inter rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  
                >
                  Histórico
                </Link>
              
              <span className="text-extrabold  font-inter text-black-500 dark:text-black hover:underline">
                <p className="text-extrabold">Olá, {cliente.nome} </p>
                <p className="text-extrabold">Seu número de Id é: {cliente.id} </p>
              </span>
              <span
                className="cursor-pointer text-extrabold font-inter text-black-900 dark:text-black-900 hover:underline"
                onClick={sairCliente}
              >
                Sair
              </span>
            </>
          ) : (
            <>
              <Link
                href="/cadastro"
                className="cursor-pointer text-extrabold  font-inter text-black-500 dark:text-black hover:underline"
              >
                Cadastre-se
              </Link>

              <Link
                href="/login"
                className="text-extrabold font-inter text-black-900 dark:text-black-900 hover:underline"
              >
                Entrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
