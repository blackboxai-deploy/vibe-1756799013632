import './globals.css'

export const metadata = {
  title: 'Minimalist Task List',
  description: 'A clean, minimalist approach to task management and productivity',
  keywords: ['tasks', 'productivity', 'minimalist', 'todo', 'task list'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}