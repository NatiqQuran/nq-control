import { Connection, ControllerAyah, ControllerMushaf, ControllerSurah } from "@ntq/sdk";
import { cookies } from "next/headers";

const ntqConnection = new Connection([new URL(process.env.API_URL!)], cookies().get("token")?.value);

export const controllerSurah = new ControllerSurah(ntqConnection);
export const controllerMushaf = new ControllerMushaf(ntqConnection);
export const controllerAyah = new ControllerAyah(ntqConnection);
