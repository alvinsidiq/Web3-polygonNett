import styled from 'styled-components';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkMode from '@mui/icons-material/DarkMode';
import { App } from '../layout';
import { useContext } from 'react';
import Wallet from './Wallet';
const HeaderRight = () => {
    const { theme, changeTheme } = useContext(App); // Destructure the context values

    return (
        <HeaderRightWrapper>
          <Wallet />
            <ThemeToggle onClick={changeTheme}>
                {theme === "light" ?  <WbSunnyIcon />:<DarkMode />}
            </ThemeToggle>
        </HeaderRightWrapper>
    );
};

const HeaderRightWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px; 
    height: 60%;
`;

const ThemeToggle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.bgDiv};
    height: 100%;
    padding: 5px;
    width: 50px;
    cursor: pointer;
`;

export default HeaderRight;