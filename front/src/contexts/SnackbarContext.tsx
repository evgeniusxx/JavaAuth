import React, { createContext, useContext, useState, useCallback } from "react";
import * as Toast from "@radix-ui/react-toast";

type ToastSeverity = "success" | "error" | "warning" | "info";

interface SnackbarContextType {
  showMessage: (message: string, severity?: ToastSeverity) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within SnackbarProvider");
  }
  return context;
};

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<ToastSeverity>("info");

  const showMessage = useCallback((msg: string, sev: ToastSeverity = "info") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }, []);

  const showSuccess = useCallback((msg: string) => {
    showMessage(msg, "success");
  }, [showMessage]);

  const showError = useCallback((msg: string) => {
    showMessage(msg, "error");
  }, [showMessage]);

  const showWarning = useCallback((msg: string) => {
    showMessage(msg, "warning");
  }, [showMessage]);

  const showInfo = useCallback((msg: string) => {
    showMessage(msg, "info");
  }, [showMessage]);

  const toneClasses: Record<ToastSeverity, string> = {
    success: "bg-emerald-600 text-white",
    error: "bg-red-600 text-white",
    warning: "bg-amber-500 text-black",
    info: "bg-slate-900 text-white",
  };

  return (
    <SnackbarContext.Provider
      value={{
        showMessage,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      <Toast.Provider duration={2000} swipeDirection="right">
        {children}
        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className={[
            "relative w-[360px] max-w-[calc(100vw-2rem)] rounded-xl p-4 shadow-lg ring-1 ring-black/10",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
            "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=end]:animate-out",
            toneClasses[severity],
          ].join(" ")}
        >
          <Toast.Description className="text-sm leading-5">
            {message}
          </Toast.Description>
          <Toast.Close
            aria-label="Close"
            className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-current hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            ×
          </Toast.Close>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 outline-none" />
      </Toast.Provider>
    </SnackbarContext.Provider>
  );
};

