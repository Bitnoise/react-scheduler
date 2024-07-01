declare const allZoomLevel: readonly [0, 1];

export declare type Config = {
    zoom: ZoomLevel;
    /**
     * Dictates filter button behavior
     * - `< 0` - filter button is hidden
     * - `0` - filter button is visible, no filter had been applied
     * - `> 0` - filter button visible - filters had been applied
     */
    filterButtonState?: number;
    /**
     * Language code: "en" | "pl"
     */
    lang?: LangCodes;
    isFiltersButtonVisible?: boolean;
    maxRecordsPerPage?: number;
    /**
     * property for changing behavior of showing tooltip hours
     * true - will show taken hours same as business days
     * false - will always show 0 taken hours on weekends in day view
     * @default false
     */
    includeTakenHoursOnWeekendsInDayView?: boolean;
};

declare type LangCodes = "en" | "pl";

declare type ParsedDatesRange = {
    startDate: Date;
    endDate: Date;
};

export declare const Scheduler: ({ data, config, startDate, onRangeChange, onTileClick, onFilterData, onClearFilterData, onItemClick, isLoading }: SchedulerProps) => JSX.Element;

export declare type SchedulerData = SchedulerRow[];

declare type SchedulerItemClickData = Omit<SchedulerRow, "data">;

export declare type SchedulerProjectData = {
    /**
     * Unique Id of item
     */
    id: string;
    /**
     * Represents start date of from which tile will render
     */
    startDate: Date;
    /**
     * Represents end date to which tile will render
     */
    endDate: Date;
    /**
     * Indicates how much time is spent per day. Given in seconds and converted by Scheduler to hours/minutes
     */
    occupancy: number;
    /**
     * Title of item
     */
    title: string;
    /**
     * Subtitle of item. Optional
     */
    subtitle?: string;
    /**
     * Short description displayed on tile. Optional
     */
    description?: string;
    /**
     * Background color of the tile, given in rgb color model. If not given, default color (rgb(114, 141,226 )) is set. Optional
     */
    bgColor?: string;
    /**
     * Array of attendee id's. Optional
     */
    attendees?: string[];
};

export declare type SchedulerProps = {
    data: SchedulerData;
    isLoading?: boolean;
    config?: Config;
    startDate?: string;
    onRangeChange?: (range: ParsedDatesRange) => void;
    onTileClick?: (data: SchedulerProjectData) => void;
    onFilterData?: () => void;
    onClearFilterData?: () => void;
    onItemClick?: (data: SchedulerItemClickData) => void;
};

declare type SchedulerRow = {
    id: string;
    label: SchedulerRowLabel;
    data: SchedulerProjectData[];
};

declare type SchedulerRowLabel = {
    icon: string;
    title: string;
    subtitle: string;
};

export declare type ZoomLevel = ZoomLevelTuple[number];

declare type ZoomLevelTuple = typeof allZoomLevel;

export { }
