import { useState, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'

import inlustrationImg from '../asserts/images/illustration.svg'
import logoImg from '../asserts/images/logo.svg'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import '../styles/auth.scss'

export function NewRoom () {
    const history = useHistory()
    const { user } = useAuth()

    const [newRoom,setNewRoom] = useState('')

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if(newRoom.trim() === '') {
            return;
        }

        const roomRef =  database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })
        history.push(`/admin/rooms/${firebaseRoom.key}`)
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
                    <div className="title">
                        <h2> Cria uma nova sala </h2>
                    </div>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            onChange={event => setNewRoom(event.target.value)}
                            type="text"
                            placeholder="Digite o nome da sala"
                        />
                        <Button type="submit">Cria sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link> </p>
                </div>
                
            </main>
        </div>
    )
}