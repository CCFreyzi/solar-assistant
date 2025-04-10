"use client";

import { Message, useAssistant } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { FiMessageSquare, FiX, FiSend, FiTrash2 } from "react-icons/fi";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [faqClicked, setFaqClicked] = useState(false);

  const { status, messages, input, submitMessage, handleInputChange } =
    useAssistant({
      api: "/api/assistant",
    });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const faqs = [
    "How much do solar panels cost?",
    "How much money will I save with solar panels?",
    "How many solar panels do I need for my home/business?",
    "Do solar panels work during cloudy days or in winter?",
  ];

  const cleanMessageText = (text: string) => {
    return text.replace(/【.*?】/g, "").replace(/\*\*/g, "");
  };

  const handleFAQClick = (question: string) => {
    setFaqClicked(true);
    handleInputChange({
      target: { value: question },
      currentTarget: { value: question },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    if (faqClicked && input && formRef.current) {
      const formEvent = new Event('submit', { bubbles: true }) as unknown as React.FormEvent<HTMLFormElement>;
      Object.defineProperty(formEvent, 'preventDefault', { value: () => {} });
      Object.defineProperty(formEvent, 'currentTarget', { value: formRef.current });
      
      submitMessage(formEvent);
      setFaqClicked(false);
    }
  }, [input, faqClicked, submitMessage]);

  return (
    <div className="fixed bottom-0 left-0 right-0 px-2 pb-2 md:bottom-6 md:right-6 md:left-auto md:px-0 z-50 ">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed md:relative bottom-6 right-6 flex items-center justify-center w-14 h-14 bg-[#F29100] rounded-full shadow-lg hover:bg-[#E68200] transition-colors"
        >
          <FiMessageSquare className="text-white text-2xl" />
        </button>
      )}

      {isOpen && (
        <div className="w-full mx-auto max-w-[calc(100%-16px)] md:max-w-none md:w-110 h-[550px] bg-[#EEEEEE] shadow-xl flex flex-col overflow-hidden rounded-sm">
          <div className="bg-[#00112D] text-white p-3 flex justify-between items-center">
            <h2 className="font-semibold">Solar Assistant</h2>
            <button
              onClick={toggleChat}
              className="text-white hover:text-[#F29100] transition-colors"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-[#EEEEEE]">
            {messages.length === 0 ? (
              <div className="space-y-2">
                <div className="text-center text-[#00112D] mb-4">
                  Hi! Here are some common questions about solar panels:
                </div>
                {faqs.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => handleFAQClick(faq)}
                    className="w-full text-left p-3 bg-white hover:bg-gray-100 rounded-lg transition-colors text-sm text-[#00112D] border border-gray-300"
                  >
                    {faq}
                  </button>
                ))}
              </div>
            ) : (
              <>
                {messages.map((m: Message) => (
                  <div
                    key={m.id}
                    className={`mb-3 p-3 rounded-lg ${
                      m.role === "user"
                        ? "bg-[#F29100] text-white ml-auto"
                        : "bg-white text-[#00112D] mr-auto border border-gray-300"
                    }`}
                  >
                    <strong className="block text-sm mb-1">
                      {m.role === "user" ? "You" : "Assistant"}
                    </strong>
                    {cleanMessageText(m.content)}
                  </div>
                ))}
                {status === "in_progress" && (
                  <div className="text-center py-2">
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-[#F29100]"></div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            ref={formRef}
            onSubmit={submitMessage}
            className="p-3 border-t border-gray-300 flex gap-2 bg-white"
          >
            <button
              type="button"
              onClick={() => {
                handleInputChange({
                  target: { value: "" },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              className="p-2 text-[#00112D] hover:text-[#F29100] disabled:opacity-50 transition-colors"
              disabled={!input}
            >
              <FiTrash2 className="text-lg" />
            </button>

            <input
              disabled={status !== "awaiting_message"}
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#F29100] disabled:bg-gray-100 text-[#00112D]"
            />

            <button
              type="submit"
              disabled={status !== "awaiting_message" || !input.trim()}
              className="p-2 text-[#00112D] hover:text-[#F29100] disabled:opacity-50 transition-colors"
            >
              <FiSend className="text-lg" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
