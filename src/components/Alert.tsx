

interface props {
    style: string;
    message: string
}

const AlertComponent = ({style, message}: props) => {

    const styleAlert = `alert-${style}`

    return (
        <div className="row">
            <div className="col-md-12">
                <div className={`alert ${styleAlert}`}>
                    {message}
                </div>
            </div>
        </div>
    );
}

export default AlertComponent;
