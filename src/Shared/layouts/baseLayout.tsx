import Navbar from "../../components/Navbar";

interface props {
    children: JSX.Element | JSX.Element[]
}

const BaseLayout = ({children}: props) => {

    return (
        <div className={'container-fluid'}>
            <Navbar />
            <div className="row">
                {children}
            </div>
        </div>
    );
}

export default BaseLayout;
