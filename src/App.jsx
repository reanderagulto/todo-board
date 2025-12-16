import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { 
    themeStore
} from './stores/theme.store';

function App() {
    const { theme, updateTheme } = themeStore();
    return (
        <main className={theme}>

        </main>
    )
}

export default App
