import Sidebar from './Sidebar'
import Body from './Body'
import Right from './Right'

export default function Dashboard() {
  return (
    <main className="flex min-h-screen min-w-max bg-black">
      <Sidebar />
      <Body />
      <Right />
    </main>
  )
}
