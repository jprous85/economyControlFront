import BaseLayout from "../../Shared/layouts/baseLayout";
import AccountView from "../views/AccountView";
import {memo} from "react";


const Account = () => {
    return (
        <BaseLayout>
            <AccountView/>
        </BaseLayout>
    );
}

export default memo(Account);
