import { toast } from 'react-toastify'
import copyImg from '../asserts/images/copy.svg'

import '../styles/room-code.scss'

type RoomCodeProps = {
    code: string
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code).then(() => {
            toast.success(`${props.code} copiado`)
        })
    }

    return (
        <button onClick={copyRoomCodeToClipboard} className="room-code">
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala # {props.code}</span>
        </button>
    )
}