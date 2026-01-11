
export default function Hero({
  children,
  isGate = false
}: {
  children?: preact.ComponentChildren;
  isGate?: boolean
}) {
  return (
    <div className="bg-Azul relative h-[65vh] md:h-screen w-full shrink-0 overflow-hidden">
      <img
        src="/img/BTO.webp"
        fetchpriority="high"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover object-center"
          alt="Hero Btoq"
        style={isGate ? {
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
        } : {}}
      />

      {/* 3. Contenido centrado: pt-24 para que no choque con el casco de la Navbar */}
      <div className="relative z-20 flex h-full items-center justify-center pt-24 px-4">
        {children}
      </div>

      {/* 4. Degradado inferior: lo hacemos un poco más sutil en móvil */}
      <div className={`
        absolute inset-x-0 bottom-0 bg-linear-to-t from-Azul to-transparent z-10
        ${isGate ? "h-[40vh]" : "h-32"}
      `} />
    </div>
  );
}