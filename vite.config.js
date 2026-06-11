import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuration Vite avec le plugin React (runtime JSX automatique),
// ce qui permet d'utiliser le JSX sans importer React dans chaque fichier.
export default defineConfig({
  plugins: [react()],
});
