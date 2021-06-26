
import delteImg from '../asserts/images/delete.svg'
import Modal from 'react-modal'

import '../styles/confirmation.scss'
import { styles } from '../utils/stylesModal'


type propsType ={
    isOpen: boolean,
    onRequestClose: () => void
    callbackSucess: () => void
}

export function  ModelConfirmationEndRoom (props: propsType) {
    return (
        <Modal
            style={styles}
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            shouldCloseOnOverlayClick={false}
            >
            <div className="content-modal-confirmacao">
                <img  src={delteImg} alt="Excluir pergunta" />
                <h2>Encerrar sala</h2>
                <span>tem certea que você deseja encerrar esta sala?</span>
                <div className="actions">
                    <button  onClick={props.onRequestClose}>Cancelar</button>
                    <button onClick={props.callbackSucess} className="tbn-confirmation">Sim, encerrar</button>
                </div>
            </div> 
        </Modal>
    )
}

