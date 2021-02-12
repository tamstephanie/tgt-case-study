/**
 * @typedef {Object} MenuDropdownDefinitions
 *  @property {String} menuTitle - The title of the menu
 *  @property {[{link: String, text: String}]} menuItems - The links in the menu and the text to display
 */
export const MenuDropdownDefinitions = [{
    menuTitle: "Trip Tools",
    menuItems: [
        {link: "/trip-planner", text: "Trip Planner"},
        {link: "/nextrip", text: "NexTrip"},
        {link: "/rider-alerts", text: "Alerts"},
        {link: "/park-rides", text: "Find a Park & Ride"},
        {link: "/stops-stations", text: "Find a Stop or Station"}
    ]
}, {
    menuTitle: "Fares",
    menuItems: [
        {link: "/fares", text: "Fares"},
        {link: "/go-to-card", text: "Go-To Card"},
        {link: "/passes", text: "Pass Programs"},
        {link: "/store", text: "Store"}     // Not like the real link on the metrotransit page
    ]
}, {
    menuTitle: "More",
    menuItems: [
        {link: "/carpool-vanpool", text: "Carpool & Vanpool"},
        {link: "/transit-link", text: "Transit Link"},
        {link: "/guaranteed-ride-home", text: "Guaranteed Ride Home"},
        {link: "/bike", text: "Bicycle"},
        {link: "/news", text: "News & Events"}
    ]
}, {
    menuTitle: "Help",
    menuItems: [
        {link: "/how-to-ride", text: "How to Ride"},
        {link: "/contact-us", text: "Contact Us"},
        {link: "/lost-found", text: "Lost & Found"},
        {link: "/accessibility", text: "Accessibility"},
        {link: "/languages", text: "Languages"},
        {link: "/police", text: "Transit Police"}
    ]
}];