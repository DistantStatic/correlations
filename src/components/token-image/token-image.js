import styles from './token-image.module.css'

export default function TokenImage(props) {
    const baseUrl = 'http://localhost:3001/'
    return (
        <img
            alt={props.tokenId}
            className={props.modal ? styles.tokenImageModal : styles.tokenImage}
            src={`${baseUrl}${props.tokenId}`}
        />
    )
}