import inlustrationImg from '../asserts/images/illustration.svg'
import logoImg from '../asserts/images/logo.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'

export function NewRom () {
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
                    <form>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">Cria sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <a href="#">clique aqui</a> </p>
                </div>
                
            </main>
        </div>
    )
}