import Main from "../../component/Main/Main";
import QuickMenu from "../../layout/QuickMenu/QuickMenu";
import {memo} from "react";

function MainPage() {
    return (
        <div>
            <QuickMenu useChat={true} useScrollTop={true}/>
            <Main/>
        </div>
    )
}

export default memo(MainPage);