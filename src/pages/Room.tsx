
import logoImg from '../asserts/images/logo.svg'
import { Button } from '../components/Button'

import '../styles/room.scss'

export function Room () {
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetmeasK" />
                    <div>codigo</div>
                </div>
            </header>

            <main className="main-content">
                <div className="room-title">
                    <h1>Sala React Q&A</h1>
                    <span>4 perguntas</span>
                </div>

                <form>
                    <textarea
                        placeholder="O que você quer perguntar?"
                    />

                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        <Button >Enviar pergunta</Button>
                    </div>
                </form>

            </main>
        </div>
    )
}