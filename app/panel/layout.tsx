import { Xpanel } from "@yakad/x";
import ProfileButton from "../(components)/ProfileButton";
import NavMenuList from "./navMenuList";

export default function Layout({ children }: any) {
    return (
        <Xpanel
            name="Natiq Control Panel"
            appbarchildren={<ProfileButton />}
            navigationchildren={<NavMenuList />}
        >
            {children}
        </Xpanel>
    );
}
