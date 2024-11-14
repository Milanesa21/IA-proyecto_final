import React, { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import Loader from "../components/Loader/Loader.jsx";
import "/public/css/pages/chat.css";

export const Chat = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const messagesEndRef = useRef(null);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    const newMessage = { type: "question", text: inputText };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText("");
    setLoading(true);
    setDisableInput(true);

    const loadingMessage = { type: "answer", text: "" };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    try {
      const response = await fetch("http://localhost:8000/jorgito/query/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_text: inputText }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        for (const char of chunk) {
          text += char;
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1] = {
              type: "answer",
              text,
            };
            return updatedMessages;
          });
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "answer", text: "¿Necesitas ayuda adicional?" },
      ]);
    } catch (error) {
      console.error("Error al obtener respuesta:", error);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          type: "answer",
          text: "Error al obtener respuesta",
        };
        return updatedMessages;
      });
    } finally {
      setLoading(false);
      setDisableInput(false);
    }
  };

  const renderMessageText = (text) => {
    return text.split(/\*\*(.*?)\*\*/).map((part, index) => {
      if (index % 2 === 0) {
        return part.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ));
      } else {
        return <strong key={index}>{part}</strong>;
      }
    });
  };

  return (
    <div className="chat">
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.type === "question" ? "left" : "right"
              }`}
            >
              {loading && message.text === "" ? (
                <div className="loading-container">
                  <Loader />
                  <p>El chambeador está pensando...</p>
                </div>
              ) : (
                <p>
                  {typeof message.text === "string"
                    ? renderMessageText(message.text)
                    : message.text}
                </p>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={inputText}
            onChange={handleChange}
            placeholder="Hazme tu pregunta"
            className="input-field"
            disabled={disableInput}
          />
          <button
            type="submit"
            className="send-button"
            disabled={disableInput || !inputText.trim()}
          >
            <IoSend size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};



export default Chat;
