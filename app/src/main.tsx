import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import ScrollToTop from './components/scroll-to-top/ScrollToTop.tsx'
import UserProvider from './contexts/UserProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ScrollToTop />
            <UserProvider>
                <App />
            </UserProvider>
        </BrowserRouter>
    </StrictMode>,
)
