export interface PlayerInfoResponse {
    /** Player detailed data */
    data: PlayerInfoData;
}

export interface PlayerInfoData {
    /** First name */
    firstname: string;

    /** Middle/common name ID (may be empty) */
    commonnameid: string;

    /** Last name */
    lastname: string;

    /** Full display name */
    fullname: string;

    /** Attribute 1 (e.g., Pace, custom attr) */
    m_attr1: number;

    /** Attribute 2 */
    m_attr2: number;

    /** Attribute 3 */
    m_attr3: number;

    /** Attribute 4 */
    m_attr4: number;

    /** Attribute 5 */
    m_attr5: number;

    /** Attribute 6 */
    m_attr6: number;

    /** Total stats sum */
    totalstats: number;

    /** Total in-game stats */
    totaligs: number;

    /** Traits as string list */
    traits: string;

    /** Specialities as string list */
    specialities: string;

    /** Market value (formatted, e.g., "€122.5M") */
    value: string;

    /** Wage (formatted, e.g., "€220K") */
    wage: string;

    /** Body type code */
    bodytypecode: number;

    curve: number;
    agility: number;
    positioning: number;
    standingtackle: number;

    /** Preferred position #3 (numeric code) */
    preferredposition3: number;

    /** Preferred position #1 (numeric code) */
    preferredposition1: number;

    longpassing: number;
    penalties: number;

    /** Retirement flag (0 = no) */
    isretiring: number;

    longshots: number;
    gkdiving: number;
    interceptions: number;
    crossing: number;
    potential: number;
    gkreflexes: number;
    reactions: number;
    composure: number;
    vision: number;

    /** Contract valid until (year) */
    contractvaliduntil: number;

    /** Date joined the team (FIFA encoded) */
    playerjointeamdate: number;

    finishing: number;
    dribbling: number;
    slidingtackle: number;
    sprintspeed: number;

    /** Height in cm */
    height: number;

    /** Preferred position #2 */
    preferredposition2: number;

    strength: number;

    /** Birthdate (FIFA encoded number) */
    birthdate: number;

    /** Age in years */
    age: number;

    ballcontrol: number;
    shotpower: number;

    trait1: number;
    trait2: number;

    /** Weight in kg */
    weight: number;

    /** Head-quality flag */
    hashighqualityhead: number;

    balance: number;

    /** Gender (0 = male) */
    gender: number;

    gkkicking: number;

    /** International reputation (0–5) */
    internationalrep: number;

    shortpassing: number;
    freekickaccuracy: number;

    /** Skill moves (1–5 stars) */
    skillmoves: number;

    /** Attacking work rate */
    attackingworkrate: number;

    aggression: number;
    acceleration: number;
    headingaccuracy: number;

    /** Modifier value */
    modifier: number;

    gkhandling: number;
    defensiveworkrate: number;

    /** Nation code */
    nationality: number;

    /** Preferred foot (1=Right, 2=Left) */
    preferredfoot: number;

    /** Weak foot rating code */
    weakfootabilitytypecode: number;

    jumping: number;

    /** Personality type code */
    personality: number;

    stamina: number;

    /** Player unique ID */
    playerid: number;

    marking: number;
    gkpositioning: number;

    /** Skill move likelihood modifier */
    skillmoveslikelihood: number;

    /** Skin tone code */
    skintonecode: number;

    /** Overall rating */
    overallrating: number;

    /** Preferred position #4 */
    preferredposition4: number;

    volleys: number;

    /** Inserted timestamp */
    inserted: string;

    /** Team ID */
    teamid: number;

    /** Team name */
    teamname: string;

    /** Team color (primary RGB) */
    teamcolor1r: number;
    teamcolor1g: number;
    teamcolor1b: number;

    /** Team domestic prestige (0–10) */
    team_domesticprestige: number;

    /** Team profitability (0–10) */
    team_profitability: number;

    /** Secondary team color (RGB) */
    teamcolor2r: number;
    teamcolor2g: number;
    teamcolor2b: number;

    /** Foundation year */
    foundationyear: number;

    /** League ID */
    leagueid: number;

    /** League name */
    leaguename: string;

    /** Loan end date (nullable) */
    loandateend: string | null;

    /** Nation ID */
    nationid: number;

    /** Nation name */
    nationname: string;

    /** Release clause (numeric) */
    release_clause: number;

    /** Role codes */
    role1: string;
    role2: string;
    role3: string;

    /** Short display name */
    shortname: string;

    /** Main position text (e.g., "ST") */
    mainposition: string;

    /** Club image URL */
    club_img: string;

    /** Player image URL */
    player_img: string;

    /** Player page URL */
    url: string;

    /** Value as integer */
    valueInt: number;

    /** Wage as integer */
    wageInt: number;


    /**
     * Nation flag image URL.
     * Not part of the raw /getPlayerInfo response — the detail endpoint
     * doesn't return it. It's enriched client-side from the search result
     * (`SearchPlayerResponse.nimg`) at selection time, see
     * PlayerSearchPanelContentComponent.onSelectPlayer().
     */
    nation_img?: string;
}
