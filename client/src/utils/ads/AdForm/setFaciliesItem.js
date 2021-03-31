function setFacilitiesItem(e) {
    let facilities = { ...this.state.facilities }
    let value
    e.target.checked ? value = 'есть' : value = 'нет'
    switch (e.target.id) {
        case 'conditioner':
            facilities.conditioner = value;
            break;
        case 'washMachine':
            facilities.washMachine = value;
            break;
        case 'internet':
            facilities.internet = value;
            break;
        case 'furniture':
            facilities.furniture = value;
            break;
        case 'tv':
            facilities.tv = value;
            break;
        case 'microwaveOven':
            facilities.microwaveOven = value;
            break;
        default:
            return facilities
    }

    return facilities
}

export default setFacilitiesItem