import React, { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);


  const onSent = async (prompt) => {
    const userMessage = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB6E3nKG0WK80mUK1hEroxwqybTN_msv34
`,
            {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("🧠 Gemini API full response:", data);

      if (data.error) {
        console.error("❌ Gemini API error:", data.error);
        const errorMsg = data.error.message || "Unknown API error.";
        setMessages((prev) => [...prev, { role: "model", text: errorMsg }]);
        return errorMsg;
      }

      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response from model.";

      const modelMessage = { role: "model", text: reply };
      setMessages((prev) => [...prev, modelMessage]);

      return reply;
    } catch (err) {
      console.error("❌ Network error:", err);
      const fallback = "⚠️ Failed to connect to Gemini.";
      setMessages((prev) => [...prev, { role: "model", text: fallback }]);
      return fallback;
    }
  };

  const contextValue = {
    onSent,
    messages,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
