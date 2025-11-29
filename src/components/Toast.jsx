import { createContext, useContext, useState } from "react";

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null);

  function show(message) {
    setMsg(message);
    setTimeout(() => setMsg(null), 2200);
  }

  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      {msg && (
        <div className="fixed bottom-4 right-4 rounded-xl bg-zinc-900 text-white px-4 py-3 shadow-lg">
          {msg}
        </div>
      )}
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}