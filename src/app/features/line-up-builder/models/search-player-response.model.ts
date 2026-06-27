export interface SearchPlayerResponse {
    /** Player rating */
    r: string;

    /** Short position code (e.g., "GK") */
    ps: string;

    /** Club image URL */
    cimg: string;

    /** Player image URL */
    pimg: string;

    /** Full name */
    fn: string;

    /** User-friendly / display name */
    uname: string;

    /** Club name (may be empty) */
    cn: string;

    /** Player ID */
    pid: string;

    /** ID (usually identical to pid) */
    id: string;

    /** Nation image URL */
    nimg: string;

    /** Player profile URL */
    purl: string;
}

