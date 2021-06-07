export class DataStorageService {
    private primaryColor: string = '#451864';
    private secondaryColor: string = '#A0CAE8';

    getPrimaryColor(): string {
        return this.primaryColor;
    }

    setPrimaryColor(color: string): void {
        this.primaryColor = color;
    }

    getSecondaryColor(): string {
        return this.secondaryColor;
    }

    setSecondaryColor(color: string): void {
        this.secondaryColor = color;
    }
}