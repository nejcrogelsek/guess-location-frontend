export type LocationFormData = {
    location_image: string;
    location: string;
}
export type LocationData = {
    location_image: string;
    location: {
        name: string;
        lat: number;
        long: number;
    };
}