export interface Organization {
    /**
     * The username of org,
     * Other users can search,
     * or go to the profile of org
     * the backend identifies the org with this prop
     */
    username: string;

    /**
     * This prop is showen in the org profile,
     * this is usually the full name of the org,
     * or name that this org is known for
     */
    name: string;

    /**
     * National id of the org,
     * this can be a changed very often,
     * this value will verifyed, after the creator of the org
     * requested
     */
    national_id: string;

    /**
     * EstablishedDate: The date of the foundation of the org,
     * the format supported from the backend: Y-MM-DD,
     * example : 1988-10-21
     */
    established_date: Date | string;

    /**
     * The profile of the org, that will
     * showen in the org profile
     */
    profile_image: string | null;
}
