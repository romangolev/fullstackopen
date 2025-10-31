import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { NotificationCoxtextProvider } from './context/NotificationCoxtext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationCoxtextProvider>
      <App />
    </NotificationCoxtextProvider>
  </QueryClientProvider>
)
