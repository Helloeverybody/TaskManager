export interface ITag {
    tagType : FilterType;
    tagValue : any;
}

export enum FilterType {
    timePeriod,
    priority,
    listAffiliation,
    completeness,
    userTag,
}
