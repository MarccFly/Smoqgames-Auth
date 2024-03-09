import axios from 'axios';

class FirebaseInstallationsService {
    constructor() {
        this.baseUrl = 'https://firebaseinstallations.googleapis.com/v1';

        this.fisProjectId = 'e95GP4MuSiyeq1qWUvMBXk';
        this.AppId = '1:214203018121:android:5d85d50ce3763cfb21cf58';
        this.ApiKey = 'AIzaSyDkPyoV72CsGWa-lJc36ndfmFpsGKrmzv8';

        this.packageName = 'com.example.app';
        this.fingerprintHash = 'ABCD1234EFGH5678IJKL9012MNOP3456QRST7890';
        this.installToken = 'your_install_token_here';
    }

    async generateAuthToken() {
        const url = `${this.baseUrl}/projects/${this.fisProjectId}/installations/${this.AppId}/authTokens:generate`;

        try {
            const response = await axios.post(url, this.getData(), { headers: await this.getHeaders() });
            if (response.status === 200) {
                console.log("Generated auth token:", response.data.token);
                return response.data.token;
            } else {
                console.error("Failed to generate auth token with status:", response.status);
                return null;
            }
        } catch (error) {
            console.error("Failed to generate auth token:", error.response ? error.response.data : error.message);
            return null;
        }
    }

    getData() {
        return {
            "fid": this.fisProjectId,
            "appId": this.AppId,
            "authVersion": "FIS_v2",
            "sdkVersion": "a:17.2.0"
        };
    }

    async getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Encoding': 'gzip',
            'Cache-Control': 'no-cache',
            'X-Android-Package': this.packageName,
            'X-Android-Cert': this.fingerprintHash,
            'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 13; 2107113SC Build/TQK1.220829.002)',
            'x-goog-api-key': this.ApiKey,
            'Authorization': `Bearer ${this.installToken}`
        };
    }
}

// FirebaseInstallationsService with manual configuration
const firebaseService = new FirebaseInstallationsService();

firebaseService.generateAuthToken()
    .then(authToken => {
        if (authToken) {
            console.log("Successfully generated auth token.");
        } else {
            console.log("Could not generate auth token. Check logs for details.");
        }
    })
    .catch(error => {
        console.error("An error occurred during auth token generation:", error);
    });