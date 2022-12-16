import BaseLayout from "../../Shared/layouts/baseLayout";
import {UserInterface} from "../interfaces/UserInterface";


const UserView = (users: any) => {

    return (
        <BaseLayout>
            <div className={'row'}>
                <div className="col-md-12">
                    {users && users.users.map((user: UserInterface) => {
                        return (
                            <div key={user.id}>{user.name}</div>
                        )
                    })}
                </div>
            </div>
        </BaseLayout>
    );
}

export default UserView;
