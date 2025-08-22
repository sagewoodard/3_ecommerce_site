import "./globals.css";
import './fanta.css'
import Head from "./head";
import Link from "next/link";
import Cart from "@/components/Cart";
import EmailInput from "@/components/Emailinput";
import ProductsProvider from "@/context/ProductContext";
import { Eczar, Grenze } from 'next/font/google';

// Load fonts
const eczar = Eczar({ subsets: ['latin'], weight: ['400','500','600','700','800'] });
const grenze = Grenze({ subsets: ['latin'], weight: ['100','200','300','400','500','600','700','800','900'], style: ['normal','italic'] });

export const metadata = {
  title: "E-Commerce Site",
  description: "An online storefront",
};

export default function RootLayout({ children }) {
  return (
    <ProductsProvider>
      <html lang="en">
        <Head />
        <body className={eczar.className}>
          <div id="portal"/>
          <div id="app">
            <header>
              <div className="header-content">
                <Link href='/'>
                  <h1 className={grenze.className}>E-Commerce Site</h1>
                </Link>

                <h5 className={`mid-text ${grenze.className}`}>- Things you need and things you don't -</h5>
                <Cart />
              </div>
            </header>
            <main>
              {children}
            </main>
            <div className="hr" />

            <footer>
              <div className="email-container">
                <h5>Get sneak peaks at new items, special offers, and so much more!</h5>
                <EmailInput />
              </div>

              <div className="links-container">
                <div>
                  <h3>SageAinsley</h3>
                  <Link target="_blank" href={'/'}>SageAinsley Hub</Link>
                  <Link target="_blank" href={'/'}>Roadmap</Link>
                </div>
                <div>
                  <h3>Store</h3>
                  <Link href={'/'}>Home</Link>
                  <Link href={'/cart'}>Cart</Link>
                </div>
                <div>
                  <h3>Support</h3>
                  <Link target="_blank" href={'/contact'}>Contact</Link>
                  <Link target="_blank" href={'/faq'}>F.A.Q.</Link>
                </div>
              </div>  

              <div className="socials">
                <p>© <a href="/" target="_blank">SageAinsley</a> 2025<br />
                Built with NextJS & <a target="_blank" href="https://www.fantacss.smoljames.com">
                FantaCSS</a> 💻</p>
                <div className="social-links">
                  <Link href={'/'} target="_blank"><i className="fa-brands fa-square-github"></i></Link>
                  <Link href={'/'} target="_blank"><i className="fa-brands fa-square-linkedin"></i></Link>
                  <Link href={'/'} target="_blank"><i className="fa-solid fa-house-chimney-user"></i></Link>
                </div>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ProductsProvider>
  );
}
