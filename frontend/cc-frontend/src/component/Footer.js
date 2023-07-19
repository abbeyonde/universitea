import './Footer.css';

const Footer = () => {
    const date = new Date();
    return (
        <footer>
            <p>Copyright&copy; {date.getFullYear()}, universiTea</p>
        </footer>
    );
}

export default Footer;