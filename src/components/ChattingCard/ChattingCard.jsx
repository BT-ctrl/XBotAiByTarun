import {
  Box,
  Stack,
  Typography,
  IconButton,
  Rating,
  ButtonBase
} from '@mui/material'
import ai from '../../assets/bot.png'
import human from '../../assets/person.png'
import {
  ThumbUpOffAlt as ThumbUpOffIcon,
  ThumbDownOffAlt as ThumbDownOffIcon,
  ThumbUpAlt as ThumbUpIcon
} from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'

export default function ChattingCard({
  details,
  showFeedbackModal,
  updateChat,
  setSelectedChatId,
  readOnly = false
}) {
  const [isRating, setIsRating] = useState(false)
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (!isRating || !rating) return

    updateChat(prev =>
      prev.map(item =>
        item.id === details.id ? { ...item, rating } : item
      )
    )
  }, [isRating, rating])

  const isAI = details.type === "AI"
  const displayRating = details.rating > 0 ? details.rating : rating

  return (
    <Stack
      p={{ xs: 1, md: 2 }}
      boxShadow="0 0 4px rgba(0,0,0,0.1)"
      borderRadius={1}
      direction="row"
      spacing={{ xs: 1, md: 3 }}
      sx={{
        '&:hover .feedback-btns': {
          visibility: 'visible',
          opacity: 1,
        },
      }}
      bgcolor={readOnly ? 'primary.main' : 'primary.light'}
    >
      <Box
        component="img"
        src={isAI ? ai : human}
        height={{ xs: 30, md: 68 }}
        width={{ xs: 30, md: 68 }}
        borderRadius="50%"
        sx={{ objectFit: 'cover' }}
        flexShrink={0}
      />

      <Box>
        {/* Replace Typography with ButtonBase for "Soul AI" to get ripple classes */}
        {isAI ? (
          <ButtonBase
            disableRipple={false} // enable ripple effect
            sx={{
              typography: { xs: 'body1', md: 'h6' },
              fontWeight: 700,
              padding: 0,
              minWidth: 'auto',
              borderRadius: 0,
              '&:hover': { backgroundColor: 'transparent' },
              textTransform: 'none',
              display: 'inline-block'
            }}
          >
            Soul AI
          </ButtonBase>
        ) : (
          <Typography fontWeight={700} fontSize={{ xs: 14, md: 16 }}>
            You
          </Typography>
        )}

        <Typography fontSize={{ xs: 12, md: 16 }}>
          {details.text}
        </Typography>

        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          mt={1}
        >
          <Typography
            fontSize={{ xs: 8, md: 12 }}
            color="text.secondary"
          >
            {format(details.time, 'hh:mm a')}
          </Typography>

          {isAI && !readOnly && (
            <Stack
              direction="row"
              className="feedback-btns"
              visibility={{ xs: 'visible', md: 'hidden' }}
              sx={{
                opacity: { xs: 1, md: 0 },
                transition: 'opacity 400ms ease',
              }}
            >
              <IconButton
                size="small"
                onClick={() => setIsRating(prev => !prev)}
              >
                {isRating ? (
                  <ThumbUpIcon fontSize="inherit" />
                ) : (
                  <ThumbUpOffIcon fontSize="inherit" />
                )}
              </IconButton>

              <IconButton
                size="small"
                onClick={() => {
                  setSelectedChatId(details.id)
                  showFeedbackModal()
                }}
              >
                <ThumbDownOffIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          )}
        </Stack>

        {isAI && (isRating || details.rating > 0) && (
          <Box pt={{ xs: 1, md: 2 }}>
            <Typography
              component="legend"
              fontSize={{ xs: 10, md: 12 }}
              mb={0.5}
            >
              {readOnly ? 'Rating:' : 'Rate this response:'}
            </Typography>
            <Rating
              name={`chat-rating-${details.id}`}
              value={displayRating}
              onChange={(event, newValue) => setRating(newValue)}
              readOnly={readOnly}
              sx={{ width: 'auto' }}
            />
          </Box>
        )}

        {details.feedback && (
          <Typography pt={1} fontSize={{ xs: 10, md: 16 }}>
            <Box component="span" fontWeight={600}>
              Feedback:
            </Box>{' '}
            <Box component="span">
              {details.feedback}
            </Box>
          </Typography>
        )}
      </Box>
    </Stack>
  )
}
