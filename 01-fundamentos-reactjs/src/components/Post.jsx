import styles from './Post.module.css';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { Comment } from './Comment';
import { Avatar } from './Avatar';
import { useState } from 'react';

export function Post({author, publishedAt, content}) {

   const [comments, setComments] = useState([]);
   const [newCommentText, setNewCommentText] = useState('');

   const isNewCommentEmpty = newCommentText.length === 0;

   const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {locale: ptBR})
   const publisheDateRelativeToNow = formatDistanceToNow(publishedAt, {
      locale: ptBR,
      addSuffix: true
   })

   function handleNewComment(){
      event.preventDefault();

      setComments([...comments, newCommentText])
      setNewCommentText('');
   }

   function handleNewCommentChange(){
      setNewCommentText(event.target.value);
      event.target.setCustomValidity('');
   }

   function deleteComment(commentToDelete){
      const newCommentList = comments.filter(comment => {
         return comment !== commentToDelete
      });

      setComments(newCommentList);
   }

   function handleNewCommentInvalid(){
      event.target.setCustomValidity('Este campo é obrigatório');
   }

  return (
    <article className={styles.post}>
      <header>
         <div className={styles.author}>

            <Avatar src={author.avatarUrl}/>

            <div className={styles.authorInfo}>
               <strong>{author.name}</strong>
               <span>{author.role}</span>
            </div>
         </div>

         <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
            {publisheDateRelativeToNow}
         </time>

      </header>

      <div className={styles.content}>
         {content.map(line => {
            if(line.type === 'paragraph'){
               return <p key={line.content}>{line.content}</p>;
            } else if(line.type === 'link'){
               return <p key={line.content}><a href='#'>{line.content}</a></p>;
            }
         })}
      </div>

      <form onSubmit={handleNewComment} className={styles.commentForm}>
         <strong>Deixe seu feedback</strong>
         <textarea 
            name="comment"
            placeholder='Deixe um comentário...'
            value={newCommentText}
            onChange={handleNewCommentChange}
            onInvalid={handleNewCommentInvalid} // quando resultado do submit é invalidado
            required
         />
         <footer>
            <button type="submit" disabled={isNewCommentEmpty}>Comentar</button>
         </footer>
      </form>

      <div className={styles.commentList}>
         {comments.map(comment =>{
            return(
               <Comment key={comment} content={comment} onDelete={deleteComment}/>
            )
         })}
      </div>
    </article>
  )
}
