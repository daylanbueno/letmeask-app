
import delteImg from '../asserts/images/delete.svg'
import Modal from 'react-modal'

import '../styles/modal.scss'

const customStyles = {
    content: {
      background: '#F8F8F8',
      borderRadius: 8,
      maxWidth: 800,
      width: 800,
      height: 360,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',

      display: 'flex',
      alignItems: 'center',
      JustContent: 'center',
 
    },
  };

type propsType ={
    isOpen: boolean,
    onRequestClose: () => void
    callbackSucess: () => void
}

export function  ModalConfirmacaoDelete (props: propsType) {
    return (
        <Modal
            style={customStyles}
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

