
import delteImg from '../asserts/images/delete.svg'
import Modal from 'react-modal'

import '../styles/modal.scss'
import { styles } from '../utils/stylesModal'


type propsType ={
    isOpen: boolean,
    onRequestClose: () => void
    callbackSucess: () => void
}

export function  ModelConfirmationDelete (props: propsType) {
    return (
        <Modal
            style={styles}
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            shouldCloseOnOverlayClick={false}
            >
            <div className="content-modal">
                <img src={delteImg} alt="Excluir pergunta" />
                <h2>Excluir pergunta</h2>
                <span>Tem certeza que deseja excluir esta pergunta?</span>
                <div className="actions">
                    <button  onClick={props.onRequestClose}>Cancelar</button>
                    <button onClick={props.callbackSucess} className="tbn-confirmation">Sim, excluir</button>
                </div>
            </div> 
        </Modal>
    )
}

