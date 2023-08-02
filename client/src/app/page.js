import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <div>
      <div>create new chat</div>
      <div><input type="text" placeholder='Enter Chat ID'/>
      <div>Join</div>
      </div>
    </div>
  )
}
