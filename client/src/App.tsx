import { ThemeProvider } from 'next-themes'
import ToasterContext from './context/ToastContext'
import RouterConfig from './router/router'
const App = () => {
  return (
    <main className="dark:bg-black">
      <ThemeProvider
        enableSystem={false}
        attribute="class"
        defaultTheme="light"
      >
        <RouterConfig />
      </ThemeProvider>
      <ToasterContext />
    </main>
  )
}

export default App
