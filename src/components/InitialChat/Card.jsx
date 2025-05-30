import { Box, Typography, Stack, IconButton } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

export default function Card({ heading, subtext, handleClick }) {
    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            p={{ xs: 1.2, md: 3 }}
            borderRadius={1}
            boxShadow="0 0 12px rgba(0,0,0,0.1)"
            bgcolor="primary.light"
            role="button"
            aria-label={`Select card for ${heading}`}
            onClick={() => handleClick(heading)}
            sx={{
                cursor: 'pointer',
                transition: 'background 200ms ease',
                '&:hover': {
                    bgcolor: 'primary.bglight',
                },
                '&:hover .icon-btn': {
                    opacity: 1,
                },
            }}
        >
            <Box>
                <Typography
                    variant="heading"
                    fontWeight={700}
                    fontSize={{ xs: 14, md: 20 }}
                >
                    {heading}
                </Typography>
                <Typography
                    color="text.secondary"
                    fontSize={{ xs: 10, md: 16 }}
                >
                    {subtext}
                </Typography>
            </Box>
            <IconButton
                size="small"
                className="icon-btn"
                aria-label="select"
                sx={{
                    opacity: 0,
                    transition: 'opacity 400ms ease',
                    bgcolor: 'primary.bglight',
                }}
            >
                <ArrowUpwardIcon fontSize="inherit" />
            </IconButton>
        </Stack>
    )
}
