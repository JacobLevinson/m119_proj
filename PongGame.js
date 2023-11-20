import React, { useState, useEffect } from 'react';

const PongGame = ({ player1SensorValue, player2SensorValue }) => {
    const paddleHeight = 60;
    const gameWidth = 600;
    const gameHeight = 300;
    const ballSize = 10;
    const paddleWidth = 10;

    const [position1, setPosition1] = useState((gameHeight - paddleHeight) / 2);
    const [position2, setPosition2] = useState((gameHeight - paddleHeight) / 2);
    const [ballPosition, setBallPosition] = useState({ x: gameWidth / 2, y: gameHeight / 2 });
    const [ballVelocity, setBallVelocity] = useState({ x: 5, y: 5 });
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition1((prevPosition1) =>
                Math.max(0, Math.min(gameHeight - paddleHeight, prevPosition1 + player1SensorValue * 5))
            );
            setPosition2((prevPosition2) =>
                Math.max(0, Math.min(gameHeight - paddleHeight, prevPosition2 + player2SensorValue * 5))
            );

            const nextBallPosition = {
                x: ballPosition.x + ballVelocity.x,
                y: ballPosition.y + ballVelocity.y,
            };

            if (
                nextBallPosition.x <= paddleWidth + 10 && // Left paddle
                nextBallPosition.y >= position1 &&
                nextBallPosition.y <= position1 + paddleHeight
            ) {
                setBallVelocity((prevVelocity) => ({ x: -prevVelocity.x, y: prevVelocity.y }));
            } else if (
                nextBallPosition.x >= gameWidth - paddleWidth - 10 -ballSize && // Right paddle
                nextBallPosition.y >= position2 &&
                nextBallPosition.y <= position2 + paddleHeight
            ) {
                setBallVelocity((prevVelocity) => ({ x: -prevVelocity.x, y: prevVelocity.y }));
            }

            if (nextBallPosition.y <= 0 || nextBallPosition.y >= gameHeight - ballSize) {
                setBallVelocity((prevVelocity) => ({ x: prevVelocity.x, y: -prevVelocity.y }));
            }

            if (nextBallPosition.x <= 0) {
                // Player 2 scores a point
                setScore2((prevScore2) => prevScore2 + 1);
                setBallPosition({ x: gameWidth / 2, y: gameHeight / 2 });
            } else if (nextBallPosition.x >= gameWidth - ballSize) {
                // Player 1 scores a point
                setScore1((prevScore1) => prevScore1 + 1);
                setBallPosition({ x: gameWidth / 2, y: gameHeight / 2 });
            } else {
                setBallPosition(nextBallPosition);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [
        player1SensorValue,
        player2SensorValue,
        paddleHeight,
        gameHeight,
        ballPosition,
        ballVelocity,
        gameWidth,
        position1,
        position2,
    ]);

    const gameStyle = {
        position: 'relative',
        width: `${gameWidth}px`,
        height: `${gameHeight}px`,
        backgroundColor: 'black',
        margin: 'auto',
        marginTop: '50px',
    };

    const paddleStyle = {
        position: 'absolute',
        width: `${paddleWidth}px`,
        height: `${paddleHeight}px`,
        backgroundColor: 'blue',
    };

    const ballStyle = {
        position: 'absolute',
        width: `${ballSize}px`,
        height: `${ballSize}px`,
        backgroundColor: 'white',
        borderRadius: '50%',
    };

    const scoreStyle = {
        position: 'absolute',
        color: 'white',
        backgroundColor: 'black', // Add background color to cover old number
        left: '50%',
        top: '10px',
        transform: 'translateX(-50%)',
        padding: '5px', // Add padding for better visibility
        textAlign: 'center', // Center the text
    };

    return (
        <div style={gameStyle}>
            <div style={{ ...paddleStyle, top: `${position1}px`, left: '10px' }} />
            <div style={{ ...paddleStyle, top: `${position2}px`, right: '10px' }} />
            <div style={{ ...scoreStyle, left: '45%', transform: 'translateX(-120%)' }}>Player 1 Score: {score1}</div>
            <div style={{ ...scoreStyle, left: '55%', transform: 'translateX(20%)' }}>Player 2 Score: {score2}</div>
            <div style={{ ...ballStyle, top: `${ballPosition.y}px`, left: `${ballPosition.x}px` }} />
        </div>
    );
};

export default PongGame;
