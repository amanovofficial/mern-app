function createFormData(){
    const formData = new FormData()
    for (let index = 0; index < this.state.images.length; index++) {
        formData.append('images[]', this.state.images[index])
    }
    if (this.props.edit) {
        formData.append('oldImages', JSON.stringify(this.state.oldImages))
        formData.append('deletedImages', JSON.stringify(this.state.deletedImages))
    }
    formData.append('region', this.state.region)
    formData.append('refPoint', this.state.refPoint)
    formData.append('numberOfStoreys', this.state.numberOfStoreys)
    formData.append('floor', this.state.floor)
    formData.append('numberOfRooms', this.state.numberOfRooms)
    formData.append('cost', this.state.rentCost.cost)
    formData.append('currency', this.state.rentCost.currency)
    formData.append('rooms', this.state.typeOfLayout.rooms)
    formData.append('lavatory', this.state.typeOfLayout.lavatory)
    formData.append('forStudents', this.state.forStudents)
    formData.append('registration', this.state.registration)
    formData.append('conditioner', this.state.facilities.conditioner)
    formData.append('washMachine', this.state.facilities.washMachine)
    formData.append('internet', this.state.facilities.internet)
    formData.append('furniture', this.state.facilities.furniture)
    formData.append('tv', this.state.facilities.tv)
    formData.append('microwaveOven', this.state.facilities.microwaveOven)
    formData.append('additionalInfo', this.state.additionalInfo)

    return formData
}

export default createFormData