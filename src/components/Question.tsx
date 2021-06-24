

import '../styles/question.scss'

export function Question (props: questionProps) {
    const { content, author } = props
    return (
        <div className="question">
            <p>{content}</p>
            <footer className='footer-info'>
                <div className="user-info-question">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>botoes</div>
            </footer>
        </div>
    )
}

type questionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
}
