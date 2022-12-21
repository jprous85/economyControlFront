import Modal from "../../components/Modal";
import {UserInterface} from "../interfaces/UserInterface";
import {LANG} from "../../Shared/Constants/LangConstants";
import {GENDER} from "../../Shared/Constants/GenderConstants";
import {ROLES_ID_BY_NAME} from "../../Shared/Constants/RolesConstants";
import {ChangeEvent} from "react";

interface props {
    user: UserInterface;
    setUser: Function;
    callback: Function
}

const UserModal = ({user, setUser, callback}: props) => {

    const changeUserData = (key: string, value: any) => {
        setUser({...user, [key]: value});
    }

    return (
        <Modal
            title={'Crear usuario'}
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
                                        <label htmlFor="user-lang">Lang</label>
                                        <select name="" id="user-lang" className={'form-control'}
                                                defaultValue={''}
                                                onChange={(e: ChangeEvent<HTMLSelectElement>) => changeUserData('lang', e.target.value)}>
                                            <option value="">Select a lang</option>
                                            {LANG.map((lang: any) => {
                                                return <option value={lang}
                                                               selected={user.lang === lang}>{lang}</option>
                                            })}
                                        </select>
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
                                <label htmlFor="user-name">Name</label>
                                <input type="text" id={'user-name'} className={'form-control'} value={user.name}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => changeUserData('name', e.target.value)}/>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="user-first-surname">First Surname</label>
                                <input type="text" id={'user-first-surname'} className={'form-control'}
                                       value={user.firstSurname ?? ''}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => changeUserData('firstSurname', e.target.value)}/>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="user-second-surname">Second Surname</label>
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
                                <label htmlFor="user-age">Age</label>
                                <input type="number" min={0} max={100} id={'user-age'} className={'form-control'}
                                       value={user.age ?? 0} onChange={(e: ChangeEvent<HTMLInputElement>) => changeUserData('age', e.target.value)}/>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="user-gender">Gender</label>
                                <select name="" id="user-gender" className={'form-control'}
                                        defaultValue={''}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => changeUserData('gender', e.target.value)}>
                                    <option value="">Select a gender</option>
                                    {GENDER.map((gender: any) => {
                                        return <option value={gender}
                                                       selected={user.gender === gender}>{gender}</option>
                                    })}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="user-role">Gender</label>
                                <select name="" id="user-role" className={'form-control'}
                                        defaultValue={''}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => changeUserData('roleId', e.target.value)}>
                                    <option value="">Select a gender</option>
                                    {Object.keys(ROLES_ID_BY_NAME).map((roleName: string) => {
                                        // @ts-ignore
                                        return <option value={ROLES_ID_BY_NAME[roleName]} selected={ROLES_ID_BY_NAME[roleName] === user.roleId}>{roleName}</option>
                                    })}
                                </select>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default UserModal;
