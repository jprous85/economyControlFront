import BaseLayout from '../../../../Shared/layouts/baseLayoutLogin';

interface props {
    submitLogin: Function,
    changeCredentials: Function,
    error: string
}

const LoginView = ({submitLogin, changeCredentials, error}: props) => {

    return (
        <BaseLayout>
            <div className={'row'}>
                <div className={'col-md-6'}>
                    <div className="card">
                        <div className="card-body">
                            <h1>Login</h1>
                            <div className="form">
                                <div className="mb-2">
                                    <span className={'form-label'}>Email</span>
                                    <input
                                        type="text"
                                        placeholder={'Email'}
                                        className={'form-control'}
                                        onChange={(e: any) => changeCredentials('email', e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <span className={'form-label'}>Password</span>
                                    <input
                                        type="password"
                                        placeholder={'Password'}
                                        className={'form-control'}
                                        onChange={(e: any) => changeCredentials('password', e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <button onClick={() => submitLogin()} className={'btn btn-primary'}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {error && <div className="alert alert-warning mt-3">{error}</div>}
                </div>
            </div>
        </BaseLayout>
    )
};

export default LoginView;
