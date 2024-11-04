import { ThemeProvider } from 'next-themes'
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
    </main>
  )
}

export default App
