export default function About() {
  return (
    <main className="bg-gray-900 text-white min-h-screen flex flex-col items-center pt-28 sm:pt-32 px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 italic text-blue-400">
        Quer entrar em contato ou enviar uma sugestão?
        <br />
        <span className="text-gray-400 text-2xl">
          Want to get in touch or send a suggestion?
        </span>
      </h1>

      <div className="bg-gray-800 border-l-4 border-blue-500 rounded-lg p-6 text-gray-300 shadow-lg max-w-3xl w-full mb-8">
        <h2 className="text-xl font-semibold mb-4 italic text-blue-400">
          🇧🇷 Português
        </h2>

        <p className="mb-4">
          Envie um e-mail para{" "}
          <span className="text-red-400 font-semibold">diogosalvadorb@gmail.com</span>
        </p>
        <p className="mb-1">
          <span className="font-semibold text-gray-200">Título:</span>{" "}
          solicitação de conteúdo ou sugestão
        </p>
        <p>
          <span className="font-semibold text-gray-200">Mensagem:</span>{" "}
          uma descrição do que deseja enviar.
        </p>

        <div className="border-t border-gray-700 my-4"></div>

        <p className="text-sm text-gray-400">
          O tempo de resposta varia conforme minha disponibilidade. <br />
          Você receberá uma mensagem assim que eu estiver disponível.
        </p>
      </div>

      <div className="bg-gray-800 border-l-4 border-blue-500 rounded-lg p-6 text-gray-300 shadow-lg max-w-3xl w-full">
        <h2 className="text-xl font-semibold mb-4 italic text-blue-400">
          🇺🇸 English
        </h2>

        <p className="mb-4">
          Send an email to{" "}
          <span className="text-red-400 font-semibold">diogosalvadorb@gmail.com</span>
        </p>
        <p className="mb-1">
          <span className="font-semibold text-gray-200">Subject:</span> content
          request or suggestion
        </p>
        <p>
          <span className="font-semibold text-gray-200">Message:</span> a short
          description of what you’d like to send.
        </p>

        <div className="border-t border-gray-700 my-4"></div>

        <p className="text-sm text-gray-400">
          Response time may vary depending on my availability. <br />
          You will receive a message as soon as I am available.
        </p>
      </div>
    </main>
  );
}