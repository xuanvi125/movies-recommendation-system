import { Link } from "react-router-dom"

export function PageNotFound() {
return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <img src="https://static-00.iconduck.com/assets.00/9-404-error-illustration-1024x454-1e9ol1ls.png" alt="Not Found"
                    style={{ width: '300px', height: 'auto', margin: '20px auto' }} />
            <h2>Sorry, the page you are looking for does not exist.</h2>
            <div>
                <div className="font-medium text-primary-600 dark:text-primary-500">
                    Go back to <Link to="/" className="hover:underline font-bold text-blue-600">Home</Link>
                </div>
            </div>
    </div>
)
}
