import Link from "next/link";

export default function NotFound() {
    return (
        <div className="page-container">
            <p className="text-large">404</p>
            <h2>Page not found :(</h2>
            <Link href={'/'}>
                <button>Home</button>
            </Link>
        </div>
    )
}