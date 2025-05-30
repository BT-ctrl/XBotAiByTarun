import { Box, Typography, Stack, Grid } from '@mui/material'
import icon from '../../assets/bot.png'
import Card from './Card'

export default function InitialChat({ generateResponse }) {
    const initialData = [
        {
            heading: 'Hi, what is the weather',
            subtext: 'Get immediate AI generated response',
        },
        {
            heading: 'Hi, what is my location',
            subtext: 'Get immediate AI generated response',
        },
        {
            heading: 'Hi, what is the temperature',
            subtext: 'Get immediate AI generated response',
        },
        {
            heading: 'Hi, how are you',
            subtext: 'Get immediate AI generated response',
        },
    ]

    return (
        <Stack height="100%" justifyContent="flex-end" p={{ xs: 2, md: 3 }}>
            <Stack alignItems="center" spacing={2} my={5}>
                <Typography variant="h2" textAlign="center">
                    How Can I Help You Today?
                </Typography>
                <Box
                    component="img"
                    src={icon}
                    height={{ xs: 42, md: 70 }}
                    width={{ xs: 42, md: 70 }}
                    borderRadius="50%"
                    boxShadow={4}
                    alt="Bot Icon"
                />
            </Stack>

            <Grid container spacing={{ xs: 1.5, md: 3 }}>
                {initialData.map(({ heading, subtext }) => (
                    <Grid item xs={12} md={6} key={heading}>
                        <Card
                            heading={heading}
                            subtext={subtext}
                            handleClick={generateResponse}
                        />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    )
}
