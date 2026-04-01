import SimpleModalDialog from "../../components/SimpleModalDialog";
import {UserInterface} from "../interfaces/UserInterface";
import {LANG} from "../../Shared/Constants/LangConstants";
import {GENDER} from "../../Shared/Constants/GenderConstants";
import {ROLES_ID_BY_NAME} from "../../Shared/Constants/RolesConstants";
import React, {ChangeEvent} from "react";
import { Form } from "react-bootstrap";

interface props {
    show: boolean,
    setShow: Function,
    user: UserInterface;
    setUser: Function;
    callback: Function
}

const UserModal = ({show, setShow, user, setUser, callback}: props) => {

    const changeUserData = (key: string, value: any) => {
        setUser({...user, [key]: value});
    }

    return (
        <SimpleModalDialog
            title={'Crear usuario'}
            show={show}
            setShow={setShow}
            callback={callback}
            closeBtn={null}
            saveBtn={null}
        >
            <div className="row">
                <div className="col-md-12">
                    <div className="form">


                        <div className="row justify-content-between">
                            <div className="col-md-6 mt-4">
                                {'UUID: ' + user.uuid}</div>
                            <div className={'col-md-6'}>
                                <div className="row justify-content-end">
                                    <div className="col-md-6">
                                        <label htmlFor="user-lang">Idioma</label>
                                        <Form.Select name="" id="user-lang" className={'form-control'}
                                                value={user.lang}
                                                onChange={(e: ChangeEvent<HTMLSelectElement>) => changeUserData('lang', e.target.value)}>
                                            <option>Seleccionar idioma</option>
                                            {LANG.map((lang: any) => {
                                                return <option key={lang} value={lang}>{lang}</option>
                                            })}
                                        </Form.Select>
                                    </div>
                                    <div className="col-md-2 mt-4">
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch"
                                                   id="user-active" checked={(user.active === 1)}
                                                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                       changeUserData('active', (e.target.checked) ? 1 : 0)
                                                   }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-4">
                                <label htmlFor="user-name">Nombre</label>
                                <input type="text" id={'user-name'} className={'form-control'} value={user.name}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => changeUserData('name', e.target.value)}/>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="user-first-surname">Primer apellido</label>
                                <input type="text" id={'user-first-surname'} className={'form-control'}
                                       value={user.firstSurname ?? ''}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => changeUserData('firstSurname', e.target.value)}/>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="user-second-surname">Segundo apellido</label>
                                <input type="text" id={'user-second-surname'} className={'form-control'}
                                       value={user.secondSurname ?? ''}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => changeUserData('secondSurname', e.target.value)}/>
                            </div>
                        </div>


                        <div className="row mt-3">
                            <div className="col-md-4">
                                <label htmlFor="user-email">Email</label>
                                <input type="text" id={'user-email'} className={'form-control'} value={user.email}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => changeUserData('email', e.target.value)}/>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="user-age">Edad</label>
                                <input type="number" min={0} max={100} id={'user-age'} className={'form-control'}
                                       value={user.age ?? 0} onChange={(e: ChangeEvent<HTMLInputElement>) => changeUserData('age', e.target.value)}/>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="user-gender">Género</label>
                                <Form.Select name="" id="user-gender" className={'form-control'}
                                             value={user.gender ?? ''}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => changeUserData('gender', e.target.value)}>
                                    <option>Seleccionar género</option>
                                    {GENDER.map((gender: any) => {
                                        return <option key={gender} value={gender}>{gender}</option>
                                    })}
                                </Form.Select>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="user-role">Rol</label>
                                <Form.Select name="" id="user-role" className={'form-control'}
                                             value={user.roleId}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => changeUserData('roleId', e.target.value)}>
                                    <option>Seleccionar rol</option>
                                    {Object.keys(ROLES_ID_BY_NAME).map((roleName: string) => {
                                        // @ts-ignore
                                        return <option key={roleName} value={ROLES_ID_BY_NAME[roleName]}>{roleName}</option>
                                    })}
                                </Form.Select>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </SimpleModalDialog>
    );
}

export default React.memo(UserModal);
