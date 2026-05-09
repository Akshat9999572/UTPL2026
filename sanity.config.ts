import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

// Provide a fallback project ID for demonstration so it doesn't crash if the user hasn't created one yet.
// In a real scenario, the user will define VITE_SANITY_PROJECT_ID in their Vercel dashboard.
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'v90117yq';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'UTPL Admin Studio',
  
  projectId,
  dataset,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
  
  basePath: '/studio',
});
