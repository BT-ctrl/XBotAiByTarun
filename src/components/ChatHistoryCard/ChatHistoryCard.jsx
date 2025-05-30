import { Box, Typography, Stack } from '@mui/material'
import { format, startOfDay, differenceInCalendarDays } from 'date-fns'
import ChattingCard from '../ChattingCard/ChattingCard'

export default function ChatHistoryCard({ details }) {
    const formatDateLabel = (date) => {
        const today = startOfDay(new Date())
        const chatDate = startOfDay(new Date(date))
        const diff = differenceInCalendarDays(today, chatDate)

        if (diff === 0) return "Today's chats"
        if (diff === 1) return "Yesterday's chats"

        return format(chatDate, 'do LLL yyyy')
    }

    return (
        <Box>
            <Typography fontWeight={700} mb={2}>
                {formatDateLabel(details.datetime)}
            </Typography>

            <Stack spacing={{ xs: 2, md: 3 }}>
                {details.chat.map((item, index) => (
                    <ChattingCard
                        details={item}
                        readOnly
                        key={index} // Consider item.id or a unique field if available
                    />
                ))}
            </Stack>
        </Box>
    )
}
