import Link from "next/link";

export default function Renovar() {
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <img
                className="mx-auto h-15 w-auto"
                src="./mulher2.jpg"
                alt="logo"
              />

              <form className="max-w-sm mx-auto">
                <div className="mb-5">
                  <input
                    type="Código do Livro"
                    id="codigodoLivro"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Código do Livro"
                    required
                  />

                  <input
                    type="date"
                    id="datadaEntrega"
                    className="mt-5 mb-2 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Data da Entrega"
                    required
                    value={
                      new Date(new Date().setDate(new Date().getDate() + 5))
                        .toISOString()
                        .split("T")[0]
                    } // Adiciona 5 dias à data atual
                  />
                </div>

                <Link
                  href={`/renovar/${"livro_id"}`}
                  type="button"
                  className="text-black bg-red-700 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                >
                  Renovar
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
