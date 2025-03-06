import { defineConfig } from 'vite';
import { resolve } from 'path'
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true, // Generates a `types` entry in `package.json`
      outDir: 'dist/types', // Output directory for .d.ts files
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'Main', // Global variable name for UMD builds
      fileName: (format) => `main.${format}.js`, // Output file name
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Externalize React and ReactDOM
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});