import { Box, Select, MenuItem, Typography } from '@mui/material'
import { useEffect, useState, useMemo } from 'react'

export default function ChatFilter({ allChats, filterChats }) {
    const [selectedRating, setSelectedRating] = useState('All Ratings')

    const handleChange = (e) => {
        setSelectedRating(e.target.value)
    }

    // Compute filtered chats based on selected rating
    const filteredChats = useMemo(() => {
        if (selectedRating === 'All Ratings') {
            return allChats
        }

        return allChats.filter(chat =>
            chat.chat.some(message => message.rating === selectedRating)
        )
    }, [selectedRating, allChats])

    useEffect(() => {
        filterChats(filteredChats)
    }, [filteredChats, filterChats])

    return (
        <Box mb={3}>
            <Typography fontSize={12} mb={0.5}>
                Filter by rating
            </Typography>
            <Select
                value={selectedRating}
                onChange={handleChange}
                size="small"
                fullWidth
                sx={{ minWidth: { xs: 1, md: 160 } }}
            >
                <MenuItem value="All Ratings">All Ratings</MenuItem>
                {[1, 2, 3, 4, 5].map(rating => (
                    <MenuItem key={rating} value={rating}>
                        {rating} Star{rating > 1 ? 's' : ''}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    )
}
