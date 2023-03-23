import './index.scss'

const Feedback = ({ message }: { message: string }) => (
    <div className='feedback'>
        <p>{message}</p>
    </div>
)

export default Feedback