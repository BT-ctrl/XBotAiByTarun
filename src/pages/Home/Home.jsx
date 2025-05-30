import { Box, Stack, Typography } from '@mui/material';
import InitialChat from '../../components/InitialChat/InitialChat';
import ChatInput from '../../components/ChatInput/ChatInput';
import ChattingCard from '../../components/ChattingCard/ChattingCard';
import FeedbackModal from '../../components/FeedbackModal/FeedbackModal';
import { useEffect, useRef, useState, useContext } from 'react';
import data from '../../aiData/sampleData.json';
import { useOutletContext } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import { ThemeContext } from '../../theme/ThemeContext';

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [chatId, setChatId] = useState(1);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [scrollToBottom, setScrollToBottom] = useState(false);
    const listRef = useRef(null);

    const { chat, setChat } = useOutletContext();
    const { mode } = useContext(ThemeContext);

    // Generate AI response based on input
    const generateResponse = (input) => {
        const query = input.toLowerCase().trim();
        const responseData = data.find(item => item.question.toLowerCase().trim() === query);

        const answer = responseData ? responseData.response : "Sorry, I didn't understand your query.";
        const timestamp = new Date();

        const newChats = [
            {
                type: 'Human',
                text: input,
                time: timestamp,
                id: chatId
            },
            {
                type: 'AI',
                text: answer,
                time: timestamp,
                id: chatId + 1
            }
        ];

        setChat(prev => [...prev, ...newChats]);
        setChatId(prev => prev + 2);
    };

    // Scroll to the latest message
    useEffect(() => {
        listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    }, [scrollToBottom]);

    const clearChat = () => setChat([]);

    return (
        <Stack
            height="100vh"
            justifyContent="space-between"
            sx={{
                '@media (max-width:767px)': {
                    background: mode === 'light' ? 'linear-gradient(#F9FAFA 60%, #EDE4FF)' : ''
                }
            }}
        >
            <Navbar />

            {chat.length === 0 ? (
                <InitialChat generateResponse={generateResponse} />
            ) : (
                <Stack
                    height={1}
                    flexGrow={0}
                    p={{ xs: 2, md: 3 }}
                    spacing={{ xs: 2, md: 3 }}
                    sx={{
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '10px'
                        },
                        '&::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
                            borderRadius: '8px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(151, 133, 186, 0.4)',
                            borderRadius: '8px'
                        }
                    }}
                    ref={listRef}
                >
                    {chat.map((item) => (
                        <ChattingCard
                            key={item.id}
                            details={item}
                            updateChat={setChat}
                            setSelectedChatId={setSelectedChatId}
                            showFeedbackModal={() => setShowModal(true)}
                        />
                    ))}
                </Stack>
            )}

            <ChatInput
                generateResponse={generateResponse}
                setScroll={setScrollToBottom}
                chat={chat}
                clearChat={clearChat}
            />

            <FeedbackModal
                open={showModal}
                handleClose={() => setShowModal(false)}
                chatId={selectedChatId}
                updateChat={setChat}
            />
        </Stack>
    );
}
