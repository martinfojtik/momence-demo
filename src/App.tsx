import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import MainContainer from './components/MainContainer'
import 'normalize.css'
import './App.css'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MainContainer/>
        </QueryClientProvider>
    )
}

export default App
