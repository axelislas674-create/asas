import { useEffect, useState } from "preact/hooks";
import { ComponentChildren } from "preact";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ComponentChildren;
  maxWidth?: string;
}

export default function Modal(
  { isOpen, onClose, children, maxWidth = "max-w-5xl" }: ModalProps,
) {
  const [render, setRender] = useState(isOpen);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      document.body.style.overflow = "hidden"; // Bloqueamos

      const timer = setTimeout(() => setActive(true), 10);
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };

      globalThis.addEventListener("keydown", handleEsc);

      // ESTA FUNCIÓN SE EJECUTA CUANDO EL COMPONENTE SE DESTRUYE
      return () => {
        clearTimeout(timer);
        globalThis.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "auto"; // <-- Aseguramos el desbloqueo aquí
      };
    } else {
      setActive(false);
      // No bloqueamos aquí, solo esperamos a la animación para dejar de renderizar
      const timer = setTimeout(() => setRender(false), 300);
      return () => {
        clearTimeout(timer);
        // Opcional: también puedes resetear el scroll aquí por si acaso
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen, onClose]);

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      {/* OVERLAY */}
      <div
        className={`absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* CONTENEDOR ANIMADO */}
      <div
        className={`relative w-full ${maxWidth} bg-[#1a2e42] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border-2 border-[#dfb760]/30 transition-all duration-300 ease-out transform ${
          active
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-8"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
