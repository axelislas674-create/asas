export default function Hero({
  children,
  isGate = false
}: {
  children?: preact.ComponentChildren;
  isGate?: boolean
}) {
  return (
    <div className="bg-Azul relative h-[65vh] md:h-screen w-full shrink-0 overflow-hidden">
      {/* 1. Imagen de fondo principal con máscara de opacidad gradual */}
      <img
        src="/img/Hero.webp"
        fetchpriority="high"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover object-center"
        alt="Hero Btoq"
        style={{
          // Si es isGate aplica tu máscara original, si no, aplica el desvanecimiento inferior
          maskImage: isGate
            ? "linear-gradient(to bottom, black 50%, transparent 100%)"
            : "linear-gradient(to bottom, black 60%, rgba(0,0,0,0.2) 100%)",
          WebkitMaskImage: isGate
            ? "linear-gradient(to bottom, black 50%, transparent 100%)"
            : "linear-gradient(to bottom, black 60%, rgba(0,0,0,0.2) 100%)"
        }}
      />

      {/* 2. SVG de Texto */}
      <img
        src="/img/Texto.svg"
        loading="lazy"
        alt="Texto decorativo"
        className="absolute left-1/2 -translate-x-1/2 z-15 pointer-events-none"
        style={{
          bottom: "23%",
          width: "80vw",
          maxWidth: "40vw"
        }}
      />

      {/* 3. Contenido centrado */}
      <div className="relative z-20 flex h-full items-center justify-center pt-24 px-4">
        {children}
      </div>

      {/* 4. Degradado inferior (el Azul del fondo) */}
      <div className={`
        absolute inset-x-0 bottom-0 bg-linear-to-t from-Azul to-transparent z-10
        ${isGate ? "h-[40vh]" : "h-32"}
      `} />
    </div>
  );
}
