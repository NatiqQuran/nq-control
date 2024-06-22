import { SvgIcon, Hr, Row } from "@yakad/ui";
import { XloginBox } from "@yakad/x";
import LogoIcon from "./logoicon";

export default function Layout({ children }: any) {
    return (
        <XloginBox>
            <Row align="center">
                <SvgIcon size={6}>
                    <LogoIcon />
                </SvgIcon>
                <h1>Natiq</h1>
            </Row>
            <Hr />
            {children}
        </XloginBox>
    );
}
