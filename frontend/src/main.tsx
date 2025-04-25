import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import { ToastContainer } from 'react-toastify';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:4200/graphql',
  cache: new InMemoryCache()
})


createRoot(document.getElementById('root')!).render(
<StrictMode>
  <BrowserRouter>
    <ApolloProvider client ={client}>
      <App />
      <ToastContainer/>
    </ApolloProvider>
  </BrowserRouter>
</StrictMode>,

)
