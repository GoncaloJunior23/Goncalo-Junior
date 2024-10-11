import { LivroI } from "@/utils/types/livros";
import { useForm } from "react-hook-form";

type Inputs = {
  termo: string;
};

type InputsPesquisaProps = {
  setLivros: React.Dispatch<React.SetStateAction<LivroI[]>>;
};

export function InputPesquisa({setLivros}: InputsPesquisaProps) {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  async function enviaPesquisa(data: Inputs) {
    //alert(data.termo);

    if (data.termo.length <2) {
      alert("Informe, no mínimo, 2 caracteres ou mais para pesquisar");
      return
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros/pesquisa/${data.termo}`);

    const dados = await response.json();

    if (dados.length == 0) {
      alert("Não há livros, autor com esse nome");
      reset({termo: ""})
      return
    }

    setLivros(dados);

  }

  async function mostraDestaques() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros`);
    const dados = await response.json();
    reset({termo: ""})
    setLivros(dados);
  }

  return (
    <div className="flex max-w-5xl mx-auto mt-3">
      <form className="flex-1" onSubmit={handleSubmit(enviaPesquisa)}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-red-500 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-red-600 dark:placeholder-red-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            placeholder="Autor, Código, Livro..."
            required
            {...register("termo")}
          />
          <button
            type="submit"
            className="text-black absolute end-2.5 bottom-2.5 bg-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-black-300 font-semibold rounded-lg text-sm px-4 py-2 dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}
