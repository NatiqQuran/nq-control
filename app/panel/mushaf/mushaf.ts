/**
 * single mushaf object
 */
export interface Mushaf {
    /**
     * Name of the Mushaf
     *
     * example: hafs
     */
    name: string;

    /**
     * Source of the musahf
     *
     * example: tanzil
     */
    source: string;

    short_name: string;

    bismillah_text: string | null;
}
