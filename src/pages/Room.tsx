import { useEffect } from 'react'
import { useState,FormEvent } from 'react'
import { useParams } from 'react-router-dom'

import logoImg from '../asserts/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/Auth'
import { database } from '../services/firebase'

import '../styles/room.scss'

type ParamProps = {
    id: string
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isAnswer: boolean;
    isHighlighted: boolean;
}>

type Question = {
    id: string
    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isAnswer: boolean;
    isHighlighted: boolean;
}


export function Room () {
    const { user } = useAuth()
    const  params = useParams<ParamProps>()
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('')
    
    const roomId = params.id


    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()
        if (newQuestion.trim() === '') {
            return;
        }

        if(!user) {
            throw  new Error('You must be logged in')
        }
        
        const question = {
            content : newQuestion,
            author:  {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted : false,
            isAnswer: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')

    }

    useEffect(() => {
        
        const roomRef = database.ref(`rooms/${roomId}`)
        roomRef.on('value', room => {
            const databaseRoom = room.val() 
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}
            console.log(room.val().questions)
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswer: value.isAnswer
                }
            })
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    },[roomId])
    

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetmeasK" />
                    <RoomCode code={roomId}/>
                </div>
            </header>

            <main className="main-content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && (<span>{questions.length} pergunta(s)</span>)}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={(event) => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        { !user && (<span>Para enviar uma pergunta, <button>faça seu login</button></span>) }
                        { user && (
                            <div className="user-info">
                                <img src={user.avatar} alt="Avatar" />
                                <span>{user.name}</span>
                            </div>
                        ) }
                        <Button type="submit" >Enviar pergunta</Button>
                    </div>
                </form>

            </main>
        </div>
    )
}