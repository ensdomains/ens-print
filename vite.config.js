import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      GRAPH_URI: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
      WEB3_PROVIDER: "https://web3metadata.ens.domains/v1/mainnet"
    },
  },
  base: '/ens-print/'
});
