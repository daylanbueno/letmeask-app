import { useParams, useHistory } from 'react-router-dom'

import Modal from 'react-modal'

import logoImg from '../asserts/images/logo.svg'
import delteImg from '../asserts/images/delete.svg'
import checkImg from '../asserts/images/check.svg'
import answerImg from '../asserts/images/answer.svg' 
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useRoom } from '../hooks/useRoom'

import {  ModalConfirmacaoDelete } from '../pages/ModalConfirmacaoDelete'

import '../styles/room.scss'
import { database } from '../services/firebase'
import { useState } from 'react';
import { toast } from 'react-toastify'

type ParamProps = {
    id: string
}


Modal.setAppElement('#root')


export function AdminRoom () {
    const history = useHistory()
    const  params = useParams<ParamProps>()
    const roomId = params.id
    const [open, setOpen] = useState(true)
    const [selectedQuestion, setSelectedQuestion] = useState('')


    const { title, questions } = useRoom(roomId)


    async function handleEndRoom () {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        }) 
        history.push('/')
    }


    function handleOperationDeleteQuestion(idQuestion: string) {
        setSelectedQuestion(idQuestion)
        setOpen(true)
    }

    async function handleDeleteQuestion() {
        await database.ref(`rooms/${roomId}/questions/${selectedQuestion}`)
        .remove().then(() => {
            setOpen(false)
            toast.success("Questão deletada com sucesso")
        }).catch(() => {
            setOpen(false)
            toast.error('Houve um problema ao tentar deletar a questão')
            
        })
        
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
        <>
        <div id="page-room">
            <header>
                <div className="content">
                    <img onClick={() => history.push('/')} src={logoImg} alt="LetmeasK" />
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
                          
                          <button onClick={() => handleOperationDeleteQuestion(question.id)}>
                              <img src={delteImg} alt="Remover pergunta"/>
                          </button>
                        </Question>
                    )
                })}
            </main>
             </div>
              <ModalConfirmacaoDelete 
                isOpen={open}
                onRequestClose={() => setOpen(false)}
                callbackSucess={()=> handleDeleteQuestion()}
              />
       
        </>
    )
}