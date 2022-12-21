

interface customProps {
    title: string;
    children: any;
    callback: Function;
    saveBtn: string | null;
    closeBtn: string | null;
}


const Modal = ({title, children, callback, saveBtn, closeBtn}: customProps) => {

    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{closeBtn ?? 'closeBtn'}</button>
                        <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={() => callback()}>{saveBtn ?? 'saveBtn'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
