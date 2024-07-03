import { cookies } from "next/headers";
import { Container, Row, Table } from "@yakad/ui";
import { XThead, XTbody, XTfoot, XTr, XTh, XTd, XTf } from "@yakad/x";
// } from "../../../../../yakad/packages/x/Xtablenew/Xtable";

interface ErrorLog {
    error_name: string;
    status_code: number;
    message: string;
    detail?: string;
}

async function getErrorsList(): Promise<ErrorLog[]> {
    const response = await fetch(`${process.env.API_URL}/error`, {
        headers: {
            Authorization: cookies().get("token")?.value || "",
        },
    });

    if (response.status !== 200) {
        throw new Error(
            `Coudn't get list of errors!, ${await response.text()}`
        );
    }

    return response.json();
}

export default async function Page() {
    const errorsList = await getErrorsList();

    return (
        <Container maxWidth="xl">
            <Row>
                <h1>Errors list</h1>
            </Row>
            <Table>
                <XThead style={{ textAlign: "justify" }}>
                    <XTr>
                        <XTh>#</XTh>
                        <XTh>Status Code</XTh>
                        <XTh sortable searchable>
                            Name
                        </XTh>
                        <XTh sortable searchable>
                            Message
                        </XTh>
                        <XTh sortable searchable>
                            Detail
                        </XTh>
                    </XTr>
                </XThead>
                <XTbody>
                    {errorsList.map((item, index) => (
                        <XTr key={index}>
                            <XTd>{index + 1}</XTd>
                            <XTd>{item.status_code}</XTd>
                            <XTd>{item.error_name}</XTd>
                            <XTd>{item.message}</XTd>
                            <XTd>{item.detail}</XTd>
                        </XTr>
                    ))}
                </XTbody>
                <XTfoot style={{ textAlign: "justify" }}>
                    <XTr>
                        <XTf>#</XTf>
                        <XTf>Status Code</XTf>
                        <XTf>Name</XTf>
                        <XTf footFunc="sum">Message</XTf>
                        <XTf footFunc="average" />
                    </XTr>
                </XTfoot>
            </Table>
        </Container>
    );
}
