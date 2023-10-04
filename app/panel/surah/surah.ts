export interface Surah {
    uuid: string;
    mushafUuid: string;

    name: string;

    // TODO: Fix type
    period: string | null;

    number: number;

    bismillahStatus: boolean;
    bismillahAsFirst_ayah: boolean;

    number_of_ayahs: number;
}
