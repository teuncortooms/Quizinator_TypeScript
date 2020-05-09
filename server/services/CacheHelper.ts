class CacheHelper {
    private userProperties = PropertiesService.getUserProperties();
    private maxProperties = 50;  // properties total storage is set to 500kB/store
    private propertySize = 5000; // property limit is set to 9kB/val

    public Clear() {
        this.userProperties.deleteAllProperties();
    }

    public Load(name: string): string {
        let str: string = "";

        let n = 1;
        let temp = this.userProperties.getProperty(name + "_slice" + n);
        while (temp != null) {
            str = str.concat(temp);
            n++;
            temp = this.userProperties.getProperty(name + "_slice" + n);
        }
        return str;
    }

    public Save(name: string, value: any) {
        let str = JSON.stringify(value);

        // value is first split into chunks to prevent cache error
        let temp;
        let n = 1;
        for (let i = 0; i < str.length && n <= this.maxProperties; i += this.propertySize) {
            temp = str.slice(i, i + this.propertySize);
            this.userProperties.setProperty(name + '_slice' + n, temp);
            n++;
        }
        if (n > this.maxProperties) {
            throw "Too much data to cache!";
        }
        else {
            // delete leftover slices from prior sessions
            let temp = this.userProperties.getProperty(name + "_slice" + n);
            while (temp != null) {
                this.userProperties.deleteProperty(name + '_slice' + n);
                n++;
                temp = this.userProperties.getProperty(name + "_slice" + n);
            }
        }
    }
}