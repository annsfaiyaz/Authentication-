import { Unbounded } from 'next/font/google';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';

const unbounded = Unbounded({ subsets: ['latin'], variable: '--font-unbounded' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export const metadata = {
  title: 'SoftQA - Authentication',
  description: 'Sign in to your SoftQA account',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${unbounded.variable}`}>
        <Header />
        <main className="bg-primary">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}



