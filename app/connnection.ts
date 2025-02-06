import {
    Connection,
    ControllerAyah,
    ControllerMushaf,
    ControllerSurah,
    ControllerTranslation,
} from "@ntq/sdk";
import { cookies } from "next/headers";

const ntqConnection = new Connection(
    [new URL(process.env.API_URL!)],
    cookies().get("token")?.value
);

// TODO: Check if this method is efficient.
export const controllerSurah = new ControllerSurah(ntqConnection);
export const controllerMushaf = new ControllerMushaf(ntqConnection);
export const controllerAyah = new ControllerAyah(ntqConnection);
export const controllerTranslation = new ControllerTranslation(ntqConnection);
