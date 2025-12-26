import { useState } from "preact/hooks";
import { JSX } from "preact";
import Modal from "@/components/Modal.tsx";

const FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfpi2FGlmsDNoq-9s2vXQgPM-94sTsG_qRPvkCuEiySGbCMwQ/formResponse";

type FormState = {
  riotId: string;
  region: string;
  twitch: string;
  streameas: string;
  discord: string;
};

// --- VALIDACIÓN ---
const validate = (name: string, value: string) => {
  if (!value) return undefined;
  if (name === "riotId" && !value.includes("#BTOQ")) return "Falta #BTOQ";
  if (name === "twitch" && value.includes("http")) return "Solo usuario";
  return undefined;
};

// --- INTERFACES PARA TIPADO ESTRICTO ---
interface InputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: JSX.TargetedEvent<HTMLInputElement>) => void;
  warn?: string;
  className: string;
}

interface RadioProps {
  label: string;
  options: string[];
  name: string;
  current: string;
  onChange: (e: JSX.TargetedEvent<HTMLInputElement>) => void;
  radioCls: (active: boolean) => string;
}

// --- COMPONENTES INTERNOS ---
const InputField = ({ name, placeholder, value, onChange, warn, className }: InputProps) => (
  <div className="w-full md:flex-1 relative">
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    />
    {warn && (
      <span className="absolute right-[2vw] top-1/2 -translate-y-1/2 text-red-400 font-bold uppercase text-[2.5vw] md:text-[0.7vw]">
        {warn}
      </span>
    )}
  </div>
);

const RadioGroup = ({ label, options, name, current, onChange, radioCls }: RadioProps) => (
  <div className="w-full md:w-[12vw] flex flex-col gap-[0.5vh]">
    <label className="text-[#dfb760] text-[3vw] md:text-[0.7vw] font-black text-center uppercase">
      {label}
    </label>
    <div className="flex bg-[#1b3149] rounded-[1vw] p-[0.3vw] border-2 border-white/10 h-[7vh] md:h-[7.6vh] items-center">
      {options.map((opt) => (
        <label key={opt} className={radioCls(current === opt)}>
          <input
            type="radio" name={name} value={opt}
            checked={current === opt} onChange={onChange} className="hidden"/>
          {opt}
        </label>
      ))}
    </div>
  </div>
);

export default function InscripcionForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormState>({
    riotId: "",region: "",
    streameas: "", discord: "",
    twitch: "",});

  const [warns, setWarns] = useState<Record<string, string | undefined>>({});
  const [status, setStatus] = useState<"idle" | "error" | "success" | "loading">("idle");

  const handleChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm((p) => ({ ...p, [name]: value }));
    setWarns((p) => ({ ...p, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(form).some((v) => v === "");
    const hasWarnings = Object.values(warns).some((v) => v !== undefined);

    if (hasEmptyFields || hasWarnings) return setStatus("error");

    setStatus("loading");
    const payload = new URLSearchParams({
      "entry.1221956897": form.riotId,"entry.1865107259": form.region,
      "entry.996253528": form.discord, "entry.494061001": form.streameas,
      "entry.1448078224": form.twitch,
    });

    try {
      await fetch(FORM_URL, { method: "POST", body: payload, mode: "no-cors" });
      setStatus("success");} catch {setStatus("error");}
  };

  const inputCls = (n: string) =>
    `w-full bg-[#1b3149] border-2 rounded-[1vw] p-[1vw] md:p-[0.8vw] text-[3.5vw] md:text-[1vw] text-white outline-none transition-all autofill:shadow-[inset_0_0_0px_1000px_#1b3149] autofill:[-webkit-text-fill-color:white] ${
      warns[n] ? "border-red-500" : "border-white/10 focus:border-[#dfb760]"
    }`;

  const radioCls = (active: boolean) =>
    `flex-1 cursor-pointer text-[3vw] md:text-[0.8vw] py-[1vh] rounded-[0.5vw] font-black text-center transition-all ${
      active ? "bg-[#dfb760] text-[#1f374f]" : "text-white/40 hover:text-white"
    }`;
    return (
    <Modal
      maxWidth="max-w-[95vw] md:max-w-[40vw]" isOpen={isOpen} onClose={onClose}>
      <form className="w-full bg-[#1f374f] rounded-xl overflow-hidden shadow-2xl relative"
        onSubmit={handleSubmit}>
        <div
          className="w-full h-[15vh] md:h-[20vh] bg-cover bg-center border-b border-[#dfb760]/30"
          style={{ backgroundImage: 'url("/img/1.png")' }}
        />
        <div className="flex flex-col gap-[2vh] p-[5vw] md:p-[2.5vw]">
          <h1 className="text-[5vw] md:text-[1.5vw] text-center text-[#dfb760] font-black uppercase tracking-[0.2em]">
            INSCRIPCIÓN
          </h1>
          <div className="flex flex-col md:flex-row gap-[2vh] md:gap-[1.5vw] items-end">
            <InputField name="riotId" placeholder="Riot ID"
            value={form.riotId} warn={warns.riotId} onChange={handleChange} className={inputCls("riotId")}/>
            <RadioGroup name="region" label="Región" options={["LAS", "LAN", "BR"]}
            current={form.region} onChange={handleChange} radioCls={radioCls}/>
          </div>
          <div className="flex flex-col md:flex-row gap-[2vh] md:gap-[1.5vw] items-end">
            <InputField name="discord" placeholder="Discord/ID"
            value={form.discord} onChange={handleChange} className={inputCls("discord")}
            />
            <RadioGroup name="streameas" label="¿Streameas?"  options={["SI", "NO"]}
            current={form.streameas} onChange={handleChange} radioCls={radioCls}
            />
          </div>
            <InputField name="twitch" placeholder="Usuario de Twitch"
            value={form.twitch} warn={warns.twitch} onChange={handleChange} className={inputCls("twitch")}/>
          <div
          className="h-[8vh] md:h-[12vh] w-full bg-cover bg-center
          opacity-80 rounded-[1vw] border border-white/5"
          style={{ backgroundImage: 'url("/img/2.png")' }}
          />

          <div className="grid grid-cols-2 gap-[1.5vw] mt-[1vh]">
            <button
              type="submit"
              disabled={status === "loading"}
              className={`bg-[#dfb760] text-[#1f374f] rounded-[1vw] py-[1.5vh] font-black text-[3vw] md:text-[0.9vw] uppercase shadow-lg transition-all ${
                status === "loading" ? "opacity-50" : "active:scale-95"
              }`}
            >
              {status === "loading" ? "ENVIANDO..." : "REGISTRARSE"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border-2 border-white/20 text-white rounded-[1vw] py-[1.5vh] font-black text-[3vw] md:text-[0.9vw] uppercase hover:bg-white/5 transition-all"
            >
              CERRAR
            </button>
          </div>
        </div>

        {status !== "idle" && status !== "loading" && (
          <div className="absolute inset-0 z-100 flex items-center justify-center bg-[#1f374f]/95 backdrop-blur-md p-[5vw]">
            <div
              className={`p-[6vw] md:p-[2vw] rounded-[2vw] text-center w-full max-w-[80vw] md:max-w-[25vw] bg-white border-b-[1vh] ${
                status === "success" ? "border-green-500" : "border-red-500"
              }`}
            >
              <p className="text-[#1f374f] font-black mb-[3vh] text-[4vw] md:text-[1.2vw] uppercase tracking-tighter">
                {status === "success" ? "¡Registro Exitoso!" : "Error: Revisa los campos"}
              </p>
              <button
                type="button"
                onClick={() => {
                  if (status === "success") onClose();
                  setStatus("idle");
                }}
                className="bg-[#1f374f] text-white w-full py-[1.5vh] rounded-[1vw] font-black text-[3.5vw] md:text-[0.8vw] uppercase transition-transform active:scale-95"
              >
                ENTENDIDO
              </button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}
