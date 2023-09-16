
export default function extract_cookie_value(name: string) {

    const value = `; ${document.cookie}`;

    const parts = value.split(`; ${name}=`);


    if (parts.length === 2) {

        const encodedValue = parts.pop().split(";").shift()

        const decodedValue = decodeURIComponent(encodedValue)

        try {

            return JSON.parse(decodedValue)

        }

        catch (e) {

            // If parsing fails, return the decoded string value
            return decodedValue
        }
    }

    return undefined;
}