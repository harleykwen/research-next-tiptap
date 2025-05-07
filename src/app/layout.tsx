import { JetBrains_Mono, Open_Sans } from 'next/font/google'

const fontMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
const fontSans = Open_Sans({ subsets: ['latin'], variable: '--font-sans' })

import '@/styles/globals.scss'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fontMono.variable} ${fontSans.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
