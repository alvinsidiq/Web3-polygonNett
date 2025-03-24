import Header from "./Header";
import themes from "./Themes";
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { useState, createContext } from "react";

// Create the context
const App = createContext();

// Layout component
const Layout = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const changeTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        console.log("Tema sekarang:", newTheme); // Debugging
    };

    return (
        <App.Provider value={{ changeTheme, theme }}>
            <ThemeProvider theme={themes[theme]}>
                <LayoutWrapper>
                    <GlobalStyle />
                    <Header />
                    {children}
                </LayoutWrapper>
            </ThemeProvider>
        </App.Provider>
    );
};

// Global styles
const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
    }
`;

// Styled component for layout wrapper
const LayoutWrapper = styled.div`
    min-height: 100vh;
    background-color: ${(props) => props.theme.bgColor};
    background-image: ${(props) => props.theme.bgImage};
    color: ${(props) => props.theme.color};
`;

export default Layout;
export { App };