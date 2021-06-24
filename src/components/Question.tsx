

import { ReactNode } from 'react'
import '../styles/question.scss'

export function Question (props: questionProps) {
    const { content, author, children,isAnswer, isHighlighted } = props
    return (
        <div className={`question ${isAnswer && 'answered'} ${(isHighlighted && !isAnswer) && 'highlighted'}`}>
            <p>{content}</p>
            <footer className='footer-info'>
                <div className="user-info-question">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    )
}

type questionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswer?: boolean;
    isHighlighted?: boolean;
}
