import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'http://localhost:4200/graphql', // <-- endpoint graphql
  documents: ['src/gql/**/*.ts'], // <-- emplacement des queries/mutations
  generates: {
    './src/gql/_generated/': { // <-- emplacement des fichiers de sortie générés
      preset: 'client', // <-- regroupe les hooks et les types
      plugins: [
        "typescript",  // TypeScript de base (types scalaires)
        "typescript-operations",  // Types pour tes queries/mutations
        //"typescript-react-apollo"  // Génère les hooks React (comme useGetAdsQuery)
      ],
      config: {
        withHooks:false, // <-- activation ou désactivation des hook React
      },
    },
  },
}
 
export default config