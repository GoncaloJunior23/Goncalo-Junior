"use client";

import Link from "next/link";
import { useClienteStore } from "@/context/cliente";
import { useRouter } from "next/navigation";

export function Header() {
  const { cliente, deslogaCliente } = useClienteStore()
  const router = useRouter()

  function sairCliente() {
    deslogaCliente()
    if (localStorage.getItem("client_key")) {
      localStorage.removeItem("client_key")
    }
    router.push("/login")
  }

  return (
    <nav className="bg-red-700 border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="./logo ima vermelho.png"
            className="h-16"
            alt="Biblioteca IMA"
          />
          <span className="self-center text-5xl font-semibold whitespace-nowrap dark:text-white">
            Instituto Mário Alves
          </span>
        </a>

        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {cliente.id ? (
            <>
              <span className="text-extrabold  font-bold text-black-500 dark:text-black hover:underline">
                Cliente: Olá, {cliente.nome}
              </span>
              <span
                className="cursor-pointer text-extrabold font-bold text-black-900 dark:text-black-900 hover:underline"
              onClick={sairCliente}>
                Sair
              </span>
            </>
          ) : (
            <>
              <Link 
              href="/cadastro" className="cursor-pointer text-extrabold  font-bold text-black-500 dark:text-black hover:underline">
                Cadastre-se
              </Link>

              <Link
                href="/login"
                className="text-extrabold font-bold text-black-900 dark:text-black-900 hover:underline"
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
