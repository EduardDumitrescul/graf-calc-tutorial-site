import {getNavigation} from "../../lib/navigation";


export default function handler(req, res) {
    const navigation = getNavigation();
    res.status(200).json(navigation);
} 