import Image from 'next/image'
import { Inter } from 'next/font/google'
import Sidebar from '../components/Sidebar'
import Feed from '../components/home/Feed'

const inter = Inter({ subsets: ['latin'] })

const style = {
  wrapper : `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content : `max-w-[1400px] w-2/3 flex justify-between`
} 

export default function Home() {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar/ >
        <Feed/>
        <h2>widgets</h2>
      </div>
    </div>
  )
}
