import {
    Typography,
    Stack,
    IconButton,
    useMediaQuery
} from '@mui/material'
import { Link, useOutletContext } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ThemeContext } from '../../theme/ThemeContext'
import { useContext } from 'react'

export default function Navbar() {
    const { handleMobileMenu } = useOutletContext()
    const isMobile = useMediaQuery('(max-width:800px)')
    const { setMode, mode } = useContext(ThemeContext)

    const toggleTheme = () => {
        setMode(prev => (prev === 'light' ? 'dark' : 'light'))
    }

    return (
        <Stack
            component="header"
            p={{ xs: 2, md: 3 }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Stack direction="row" alignItems="center" spacing={2}>
                {isMobile && (
                    <IconButton
                        aria-label="Open mobile menu"
                        onClick={() => handleMobileMenu(prev => !prev)}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Typography
                        variant="h1"
                        component="h1"
                        color="text.primary"
                    >
                        Bot AI
                    </Typography>
                </Link>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography
                    textTransform="capitalize"
                    fontSize={10}
                >
                    {mode}
                </Typography>
                <IconButton
                    aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
                    onClick={toggleTheme}
                >
                    {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
            </Stack>
        </Stack>
    )
}
