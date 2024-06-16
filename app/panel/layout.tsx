import ProfileButton from "../(components)/ProfileButton";
import NavigationItems from "./navigationItems";
import { Xpanel } from "@yakad/x";

export default function Layout({ children }: any) {
       return (
        <Xpanel
            name="Natiq Control Panel"
            appbarChildren={<ProfileButton />}
            navigationChildren={<NavigationItems />}
        >
            {children}
        </Xpanel>
    );
}
