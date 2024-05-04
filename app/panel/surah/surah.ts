export type SurahPeriod = "maki" | "madani" | null;

export interface Surah {
    surah_uuid: string;
    mushaf_uuid: string;

    surah_name: string;

    surah_period: SurahPeriod;

    surah_number: number;

    bismillah_status: boolean;
    bismillah_as_first_ayah: boolean;

    number_of_ayahs: number;
}
