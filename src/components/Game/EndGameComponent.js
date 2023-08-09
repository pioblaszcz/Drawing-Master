import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { useUserStore, useAppStore } from '../../stores/hooks';
import { useEffect } from 'react';

let interval;

const EndGameComponent = () => {

    const resultRef = useRef(null)

    const navigate = useNavigate();
    const { user, addUserPoints } = useUserStore();
    const { app } = useAppStore();
    const { nick, avatar, points } = user;
    const { compareRate } = app;

    const [hideResult, setHideResult] = useState(false);
    const [userPoints, setUserPoints] = useState(points);

    let pointsToAdd = compareRate >= 60 ? compareRate : (100 - compareRate) * -1;

    useEffect(() => {
        const rate = (2000 / points) < 0 ? (2000 / points) * -1 : (2000 / points);
        if (pointsToAdd > 0) interval = setInterval(() => setUserPoints(prev => prev + 1), rate);
        else interval = setInterval(() => setUserPoints(prev => prev - 1), rate);
        return () => clearInterval(interval);
    }, [points, pointsToAdd]);

    useEffect(() => {
        if (userPoints === points + pointsToAdd) {
            clearInterval(interval);
            resultRef.current.classList.add('endGame__result--hide');
            setTimeout(() => setHideResult(true), 3000);
        }
    }, [userPoints, points, pointsToAdd, setHideResult]);

    const handleGoToHomePage = () => {
        addUserPoints(pointsToAdd);
        navigate('/');
    }


    return (
        <div className="endGame">
            {hideResult ?
                <div className={"endGame__playAgain"}>
                    <img src={avatar} alt="avatar" className="playAgain__avatar" />
                    <p className="playAgain__nickname">{nick}</p>
                    <div className="playAgain__trophies">
                        <FontAwesomeIcon icon={faTrophy} className="playAgain__trophyIcon" />
                        <p className={`playAgain__points ${userPoints < 0 && 'playAgain__points--red'}`}>{userPoints}</p>
                    </div>
                    <div className="playAgain__container">
                        <div className="playAgain__button" onClick={handleGoToHomePage}>Play again</div>
                    </div>
                </div>
                : <div className="endGame__result" ref={resultRef}>
                    <FontAwesomeIcon icon={faTrophy} className="endGame__trophyIcon" />
                    <p className="endGame__points">{userPoints}</p>
                    <p className={`endGame__pointsToAdd ${pointsToAdd > 0 && 'endGame__pointsToAdd--green'}`}>{pointsToAdd}</p>
                </div>}
        </div>
    );
};

export default observer(EndGameComponent);