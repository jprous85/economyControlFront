interface props {
    title: string;
}

const BlockSeparator = ({title}: props) => {
    return (
        <div className="row mt-3 mb-3">
            <div className="col-md-2">
                <hr/>
            </div>
            <div className="col-md-1 text-center">{title}</div>
            <div className="col-md-9">
                <hr/>
            </div>
        </div>
    );
}

export default BlockSeparator;
