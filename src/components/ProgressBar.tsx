interface props {
    minimum: number;
    value: number;
    maximum: number;
}

const ProgressBarComponent = ({minimum, value, maximum}: props) => {

    if (maximum > 0) {
        return (
            <div className="progress" role="progressbar" aria-label="Basic example"
                 aria-valuemin={minimum}
                 aria-valuenow={value}
                 aria-valuemax={maximum}>
                <div className={"progress-bar progress-bar-striped progress-bar-animated"}
                     style={{width: 100}}/>
            </div>
        );
    }

    return null;
}

export default ProgressBarComponent;
