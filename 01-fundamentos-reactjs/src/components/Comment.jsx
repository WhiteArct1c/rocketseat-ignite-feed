import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';
import {ThumbsUp, Trash} from 'phosphor-react';

export function Comment({content, onDelete}) {

   const[likeCount, setLikeCount] = useState(0);

   function handleDeleteComment (){
      onDelete(content);
   }

  return (
   <div className={styles.comment}>
      
      <Avatar hasBorder={false} src='https://github.com/WhiteArct1c.png' />

      <div className={styles.commentBox}>
         <div className={styles.commentContent}>
            <header>
               <div className={styles.authorAndTime}>
                  <strong>Matheus Bispo</strong>
                  <time title='10 de Janeiro às 12:35h' dateTime='2023-01-10 12:35:00'>Cerca de 1h atrás</time>
               </div>
               <button onClick={handleDeleteComment} title="Deletar comentário">
                  <Trash size={24}/>
               </button>
            </header>
            <p>
               {content}
            </p>
         </div>
         <footer>
            <button onClick={() => setLikeCount(likeCount+1)}>
               <ThumbsUp/>
               Aplaudir <span>{likeCount}</span>
            </button>
         </footer>
      </div>
   </div>
  )
}
