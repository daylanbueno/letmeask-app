import { useParams, useHistory } from 'react-router-dom'

import logoImg from '../asserts/images/logo.svg'
import delteImg from '../asserts/images/delete.svg'
import checkImg from '../asserts/images/check.svg'
import answerImg from '../asserts/images/answer.svg' 
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useRoom } from '../hooks/useRoom'

import '../styles/room.scss'
import { database } from '../services/firebase'

type ParamProps = {
    id: string
}

export function AdminRoom () {
    const history = useHistory()
    const  params = useParams<ParamProps>()
    const roomId = params.id

    const { title, questions } = useRoom(roomId)


    async function handleEndRoom () {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        }) 
        history.push('/')
    }

    async function handleDeleteQuestion(idQuestion: string) {
        if(window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
            await database.ref(`rooms/${roomId}/questions/${idQuestion}`).remove()
        }
    }

    async function handleCheckQuestionAsAnswared(idQuestion: string) {
        await database.ref(`rooms/${roomId}/questions/${idQuestion}`).update({
            isAnswer: true
        })
    }

    async function handleHightQuestion(idQuestion: string) {
       
        await database.ref(`rooms/${roomId}/questions/${idQuestion}`).update({
            isHighlighted: true
        })
    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetmeasK" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button outlined onClick={handleEndRoom}>Encerra sala</Button>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && (<span>{questions.length} pergunta(s)</span>)}
                </div>
                {questions.map(question => {
                    return ( 
                        <Question 
                            key={question.id} 
                            isAnswer={question.isAnswer}
                            isHighlighted={question.isHighlighted}
                            content={question.content}
                            author={question.author} 
                         > 
                      
                          { !question.isAnswer && (
                             <>
                                <button onClick={() => handleCheckQuestionAsAnswared(question.id)}>
                                    <img src={checkImg} alt="Marca pergunta como respondida"/>
                                </button>
                            
                                <button onClick={() => handleHightQuestion(question.id)}>
                                    <img src={answerImg} alt="Da destaque a pergunta"/>
                                </button>
                            </>
                          )}
                          
                          <button onClick={() => handleDeleteQuestion(question.id)}>
                              <img src={delteImg} alt="Remover pergunta"/>
                          </button>
                        </Question>
                    )
                })}
            </main>
        </div>
    )
}