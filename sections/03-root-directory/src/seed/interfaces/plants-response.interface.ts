export interface PlantsResponse {
    Categories:          string;
    "Common name (fr.)": null | string;
    Img:                 string;
    Zone:                string[];
    Family:              string;
    "Common name":       string[] | null;
    "Latin name":        string;
    "Other names":       null | string;
    Description:         null;
    Origin:              string[] | null;
    id:                  string;
    Climat:              Climat;
}

export enum Climat {
    AridTropical = "Arid Tropical",
    Subtropical = "Subtropical",
    SubtropicalArid = "Subtropical arid",
    Tropical = "Tropical",
    TropicalHumid = "Tropical humid",
    TropicalToSubtropical = "Tropical to subtropical",
}