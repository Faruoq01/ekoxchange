export function formatTimestamp(timestamp: number | string): string {
  const ts =
    typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp;
  const date = new Date(ts);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${month}, ${year}`;
}

export const nigerianStates: String[] = [
  "All States",
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Federal Capital Territory",
];

export const getRoadPolyline: any = (
  source: { lat: number; lng: number },
  destination: { lat: number; lng: number }
): Promise<google.maps.LatLngLiteral[]> => {
  return new Promise((resolve, reject) => {
    if (!source || !destination) {
      reject("Source and destination are required");
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          const route = result.routes[0];
          if (!route.overview_polyline) {
            reject("No polyline returned");
            return;
          }

          // Encoded polyline string
          const encodedPath: any = route.overview_polyline?.toString() || "";
          resolve(encodedPath);
        } else {
          reject("Directions request failed: " + status);
        }
      }
    );
  });
};
