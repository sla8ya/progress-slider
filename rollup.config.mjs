import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "main.ts",
  output: {
    file: "dist/main.js", // Указываем путь к файлу в папке dist
    format: "cjs",        // Используем CommonJS, так как это требуется Obsidian
    exports: "default",
    sourcemap: true,      // Включаем sourcemap
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json", // Указываем путь к tsconfig.json
    }),
  ],
  external: ["obsidian"], // Указываем obsidian как внешнюю зависимость
};
