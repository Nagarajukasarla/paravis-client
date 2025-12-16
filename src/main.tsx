import { StrictMode } from 'react'
import { Toaster } from 'sonner'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './router'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
        <Toaster
            position="top-center"
            richColors
            toastOptions={{
                className: "flex items-center justify-center text-center h-9",
                style: {
                    padding: "10px",
                },
            }}
        />
    </StrictMode>,
)
