import { useContext } from "react"
import { ThemeContext } from "../../theme/ThemeContext"
import {
    Typography,
    Box,
    Stack,
    Button,
    useMediaQuery
} from '@mui/material'
import { Link } from 'react-router-dom'
import AddCommentIcon from '@mui/icons-material/AddComment'
import CloseIcon from '@mui/icons-material/Close'
import icon from '../../assets/newchat.png'

export default function Sidebar({ setChat, closeMenu }) {
    const { mode } = useContext(ThemeContext)
    const isMobile = useMediaQuery('(max-width:800px)')

    return (
        <Box>

            {isMobile && (
                <Button
                    onClick={closeMenu}
                    endIcon={<CloseIcon />}
                    sx={{
                        width: 1,
                        justifyContent: 'flex-end',
                        color: mode === 'light' ? 'primary.dark' : 'text.primary'
                    }}
                >
                    Close
                </Button>
            )}

            <Link to="/" style={{ textDecoration: 'none' }}>
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                    py={2}
                    px={{ xs: 2, md: 3 }}
                    onClick={() => {
                        setChat([])
                        closeMenu()
                    }}
                    sx={{
                        bgcolor: 'primary.main',
                        '&:hover': {
                            bgcolor: 'primary.bg'
                        },
                        cursor: 'pointer'
                    }}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Box
                            component="img"
                            src={icon}
                            alt="New Chat"
                            height={42}
                            width={42}
                            borderRadius={2}
                            boxShadow={4}
                            flexShrink={0}
                        />
                        <Typography
                            variant="heading"
                            fontSize={{ xs: 16, md: 20 }}
                            color="text.primary"
                        >
                            New Chat
                        </Typography>
                    </Stack>
                    <AddCommentIcon sx={{ color: 'text.primary' }} />
                </Stack>
            </Link>

            <Box p={{ xs: 2, md: 3 }}>
                <Link to="/history" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={closeMenu}
                    >
                        Past Conversations
                    </Button>
                </Link>
            </Box>

        </Box>
    )
}
