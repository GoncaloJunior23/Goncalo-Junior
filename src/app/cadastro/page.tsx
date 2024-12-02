"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type Inputs = {
  id: number;
  email: string;
  senha: string;
  confirmaSenha: string;
  nome: string;
  escolaridade: string;
  telefone: string;
  instituicao: string;
};

export default function Cadastrar() {
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();

  async function cadastro(data: Inputs) {
    // Converte campos para minúsculas
    data.email = data.email.toLowerCase();
    data.senha = data.senha.toLowerCase();
    data.confirmaSenha = data.confirmaSenha.toLowerCase();
    data.nome = data.nome.toLowerCase();
    data.escolaridade = data.escolaridade.toLowerCase();
    data.telefone = data.telefone.toLowerCase(); // Corrigido o uso do campo
    data.instituicao = data.instituicao.toLowerCase();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cadastros`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data), // Enviando o objeto data diretamente
      });

      console.log("Resposta recebida:", response); // Log da resposta recebida

      if (response.status === 201) {
        router.push("/login");
      } else {
        const error = await response.json();
        console.error("Erro ao criar cadastro:", error); // Log do erro
        alert("Erro... Digite todos os campos corretamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao se comunicar com o servidor. Tente novamente mais tarde.");
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="max-w-md mx-auto mt-5" onSubmit={handleSubmit(cadastro)}>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                  {...register("email")}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-inter absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  E-mail
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password" // Corrigido o tipo para password
                  id="senha"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                  {...register("senha")}
                />
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-inter absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Senha
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password" // Corrigido o tipo para password
                  id="confirmaSenha"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                  {...register("confirmaSenha")} // Adicionado o register para "confirmaSenha"
                />
                <label
                  htmlFor="floating_repeat_password"
                  className="peer-focus:font-inter absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirma Senha
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    id="nome"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    required
                    {...register("nome")}
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-inter absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Nome Completo
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    id="escolaridade"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    required
                    {...register("escolaridade")}
                  />
                  <label
                    htmlFor="floating_last_name"
                    className="peer-focus:font-inter absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Escolaridade
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="tel"
                    id="telefone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    required
                    {...register("telefone")}
                  />
                  <label
                    htmlFor="floating_phone"
                    className="peer-focus:font-inter absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Telefone (53)9000-0000
                  </label>
                </div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  id="instituicao"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                  {...register("instituicao")}
                />
                <label
                  htmlFor="floating_company"
                  className="peer-focus:font-inter absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Instituição de Ensino
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-vermelho hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-inter rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}  
