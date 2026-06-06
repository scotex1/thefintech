import { redirect } from 'next/navigation'
// index.html → Landing page (not dashboard redirect)
export default function Home() { redirect('/home') }
