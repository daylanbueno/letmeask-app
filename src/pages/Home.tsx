import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { toast }  from 'react-toastify'

import inlustrationImg from '../asserts/images/illustration.svg'
import googleIconImg from '../asserts/images/google-icon.svg'
import logoImg from '../asserts/images/logo.svg'

import '../styles/auth.scss'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'


export function Home () {
    const  history = useHistory()
    const { user, signInWithGoogle } = useAuth()

    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom() {
        if(!user) {
          await signInWithGoogle()
        } 
        history.push(`/rooms/new`)
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if (roomCode.trim() === '')  {
            return;
        }

        const roomRef = await database.ref(`/rooms/${roomCode}`).get()

        if(!roomRef.exists()) {
            toast.error('Não existe uma sala para o código informado!')
            return
        }

        if(roomRef.val().endedAt) {
            toast.error('A sala para o código informado  já foi encerrada!')
            return
        }

        history.push(`/rooms/${roomRef.key}`)
    }

    return (
        <div id="paga-auth">
            <aside>
                <img src={inlustrationImg} alt="Inlustração sibolizando perguntas e respostas" />
                <strong>Crie salas de Q &amp; A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main className="main-content">
                <div>
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={() => handleCreateRoom()} className="create-rom"> 
                        <img src={googleIconImg} alt="Logo do google" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator">ou entre em uma sala </div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            onChange={event => setRoomCode(event.target.value)}
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">Entra na sala</Button>
                    </form>
                </div>
                
            </main>
        </div>
    )
}