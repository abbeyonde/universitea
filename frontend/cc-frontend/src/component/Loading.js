import BarLoader from 'react-spinners/BarLoader'
import './Loading.css'
const Loading = () => {
  return (
    <div className="sweet-loading">
      <BarLoader
        className="loader"
        color="#2d2425"
        height={4}
        width={400}
        speedMultiplier={0.5} />
    </div>
  )
}

export default Loading;