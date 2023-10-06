export interface Surah {
    uuid: string;
    mushafUuid: string;

    name: string;

    period: "maki" | "madani" | null;

    number: number;

    bismillahStatus: boolean;
    bismillahAsFirst_ayah: boolean;

    number_of_ayahs: number;
}
