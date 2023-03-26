import BaseLayout from '../../../Shared/layouts/baseLayoutLogin';
import React from "react";

interface props {
    submitLogin: Function,
    changeCredentials: Function,
    error: string
}

const LoginView = ({submitLogin, changeCredentials, error}: props) => {

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        submitLogin();
        event.preventDefault();
    }

    return (
        <BaseLayout>
            <div className={'row'}>
                <div className={'col-md-6'}>
                        <div className="card">
                            <div className="card-body">
                                <h1>Login</h1>
                                <form onSubmit={handleSubmit}>
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
                                            <button type={'submit'} className={'btn btn-primary'} onClick={handleSubmit}>Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    {error && <div className="alert alert-warning mt-3">{error}</div>}
                </div>
            </div>
        </BaseLayout>
    )
};

export default LoginView;
