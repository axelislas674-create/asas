// utils.ts
import { type Context, createDefine } from "fresh";
// Nota: Eliminamos Alias de vite si no lo usas para evitar warnings

export type Theme = "light" | "dark";

// AGREGAMOS 'export' AQUÍ:
export interface State {
  shared: string;
  theme: Theme;
}

export type MyContext = Context<State>;
export const define = createDefine<State>();