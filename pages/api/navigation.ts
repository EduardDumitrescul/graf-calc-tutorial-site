// API route that returns the navigation structure for the tutorial section
// Calls the getNavigation function to fetch both the hierarchical and flat navigation data

import { getNavigation } from "../../lib/navigation";

export default function handler(req, res) {
    const navigation = getNavigation(); // Fetch navigation data
    res.status(200).json(navigation); // Return the data as JSON
}
