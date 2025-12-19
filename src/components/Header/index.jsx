import {
    useEffect
} from 'react';
import { themeStore } from '@stores/theme.store';

const Header = () => {
    const { theme, updateTheme, hasHydrated } = themeStore();

    const toggleTheme = () => {
        updateTheme(theme == 'light' ? 'dark' : 'light');
        console.log(theme);
    }

    useEffect(() => {
        if (!hasHydrated) return;
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme, hasHydrated]);

    if (!hasHydrated) return null;

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li><a>Homepage</a></li>
                        <li><a>Portfolio</a></li>
                        <li><a>About</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a 
                    href="/" 
                    className="btn btn-ghost text-xl"
                >
                    Focus Daily
                </a>
            </div>
            <div className="navbar-end">
                <input 
                    type="checkbox" 
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                    className="toggle toggle-md" 
                />
            </div>
        </div>
    )
}

export default Header
