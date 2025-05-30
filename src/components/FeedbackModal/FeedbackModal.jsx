import {
    Box,
    Stack,
    Typography,
    Modal,
    IconButton,
    TextField,
    Button
} from '@mui/material'
import FeedbackIcon from '@mui/icons-material/Feedback'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'

export default function FeedbackModal({ open, handleClose, chatId, updateChat }) {
    const [input, setInput] = useState('')

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '95%',
        maxWidth: 720,
        bgcolor: 'primary.bgtheme',
        boxShadow: 24,
        p: { xs: 2, md: 3 },
        borderRadius: 2,
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        updateChat(prev =>
            prev.map(item =>
                item.id === chatId ? { ...item, feedback: input } : item
            )
        )

        setInput('')
        handleClose()
    }

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="feedback-modal-title">
            <Box sx={style}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={{ xs: 0.5, md: 2 }} alignItems="center">
                        <FeedbackIcon />
                        <Typography id="feedback-modal-title" fontSize={{ xs: 14, md: 18 }} fontWeight={600}>
                            Provide Additional Feedback
                        </Typography>
                    </Stack>
                    <IconButton onClick={handleClose} aria-label="Close feedback modal">
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <Box
                    component="form"
                    pt={3}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        multiline
                        rows={6}
                        fullWidth
                        placeholder="Enter your feedback here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                    />
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}
