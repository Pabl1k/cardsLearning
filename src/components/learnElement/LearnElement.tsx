import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {CardType} from "../../api/api";
import {useParams} from "react-router-dom";
import {getCardsTC} from "../../redux/reducers/cardsList-reducer";
import {LearnQuestion} from "./learnQuestion/LearnQuestion";
import {LearnAnswer} from "./learnAnswer/LearnAnswer";

const grades = ['no idea', 'forgot', 'think long', 'mix up', 'knew'];

const getRandomCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    return cards[res.id + 1];
}

export const LearnElement: React.FC = React.memo(() => {
    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cardsListReducer.cards)

    const {questionId} = useParams<{ questionId: string }>()

    const [firstCard, setFirstCard] = useState<boolean>(true)
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [card, setCard] = useState<CardType>({
        _id: ''
    } as CardType)

    const dispatch = useDispatch()

    useEffect(() => {
        if (firstCard) {
            debugger
            dispatch(getCardsTC(questionId.slice(1)))
            setFirstCard(false)
        }
        if (cards.length > 0) {
            setCard(getRandomCard(cards))
            return () => {
                console.log('Learning Page clear effect ')
            }
        }
    }, [dispatch, cards])

    const onNextCard = useCallback((grade: number) => {
        setShowAnswer(false);
        if (cards.length > 0) {
            if (!card._id) {
                console.log('error in useCallback')
            }
            // dispatch(sendGrade(grade)
            setCard(getRandomCard(cards))
        } else {
            alert(`Something bad 'onNextCard'`)
        }
    }, [cards, card])

    return <div>

        {!showAnswer ? <LearnQuestion card={card}
                                      setShowAnswer={setShowAnswer}
                                      onNextCard={onNextCard}
            />
            : <LearnAnswer card={card}
                           setShowAnswer={setShowAnswer}
                           onNextCard={onNextCard}
                           grades={grades}
            />
        }

    </div>
})