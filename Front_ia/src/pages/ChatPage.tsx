import { Navbar } from "../components/Navbar"; // Importa el Navbar
import { Sidebar } from "../components/Sidebar"; // Importa el Sidebar
import { Chat } from "../components/Chat"; // Importa el chat

export const ChatPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col ml-48">
        {/* Navbar */}
        <Navbar />

        {/* Contenido principal */}
        <main className="flex-1 bg-gray-100 p-6">
          {/* Chat Interface */}
          <Chat />
        </main>
      </div>
    </div>
  );
};
