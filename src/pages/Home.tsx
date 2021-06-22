import { useHistory } from 'react-router-dom'

import inlustrationImg from '../asserts/images/illustration.svg'
import googleIconImg from '../asserts/images/google-icon.svg'
import logoImg from '../asserts/images/logo.svg'

import '../styles/auth.scss'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/Auth'

export function Home () {
    const  history = useHistory()
    const { user, signInWithGoogle } = useAuth()

    function handleCreateRom() {
        if(!user) {
            signInWithGoogle()
            return 
        }
        history.push('/rooms/new')
    }

    return (
        <div id="paga-auth">
            <aside>
                <img src={inlustrationImg} alt="Inlustração sibolizando perguntas e respostas" />
                <strong>Crie salas de Q &amp; A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main className="main-content">
                <h1>{user?.name}</h1>
                <div>
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={() => signInWithGoogle()} className="create-rom"> 
                        <img src={googleIconImg} alt="Logo do google" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator">ou entre em uma sala </div>
                    <form>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button onClick={() => handleCreateRom()} type="submit">Entra na sala</Button>
                    </form>
                </div>
                
            </main>
        </div>
    )
}