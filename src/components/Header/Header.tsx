import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.scss'
import logo from './logo.png'
import { Link } from 'react-router-dom';

export default function Header(): React.ReactNode {
    return (
        <header>
        <nav className="navbar navbar-expand-lg user-color_bug">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src={logo} /></Link>
            </div>
        </nav>
    </header>
    )
}