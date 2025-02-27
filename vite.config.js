import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      GRAPH_URI: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
      WEB3_PROVIDER: "https://rpc.ankr.com/eth"
    },
  },
  base: '/ens-print/'
});
