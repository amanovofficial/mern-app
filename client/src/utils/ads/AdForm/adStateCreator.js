const adStateCreator = (ad = {}) => {

    if (Object.keys(ad).length === 0) {// если объект пустой
        return {
            id:null,
            images: [],
            regions: ['Юнусабадский район', 'Алмазарский район', 'Яккасарайский район'],
            region: 'Юнусабадский район', //регион
            refPoint: '', //ориентир
            numberOfRooms: '', //количество комнат
            floor: '', //этаж квартиры
            numberOfStoreys: '', //этажность дома
            rentCost: {  //стоимость аренды
                cost: '',
                currency: 'у.е' //валюта
            },
            typeOfLayout: { //тип планировки:
                rooms: 'Раздельный', //комнат
                lavatory: 'Раздельный' //санузла
            },
            forStudents: 'нет', //Сдается ли квартира студентам
            registration: 'нет', //оформляется ли временная прописка
            facilities: {  //общая информация
                conditioner: 'нет',//кондиционер
                washMachine: 'нет',//стиральная машина
                internet: 'нет', // интернет
                furniture: 'нет', //мебель
                tv: 'нет', // телевизор
                microwaveOven: 'нет', //микроволновка
            },
            additionalInfo: '', //дополнительная информация(доп. контакты, условия, описание)
            isCreatedOrUpdated: false,
            alert: {
                variant: '',
                text: ''
            }
        }
    } else {
        return {
            id:ad._id,
            images: [],
            oldImages: ad.images,
            deletedImages:[],
            regions: ['Юнусабадский район', 'Алмазарский район', 'Яккасарайский район'],
            region: ad.region,
            refPoint: ad.refPoint,
            numberOfRooms: ad.numberOfRooms,
            floor: ad.floor,
            numberOfStoreys: ad.numberOfStoreys,
            rentCost: ad.rentCost,
            typeOfLayout: ad.typeOfLayout,
            forStudents: ad.forStudents,
            registration: ad.registration,
            facilities: ad.facilities,
            additionalInfo: ad.additionalInfo,
            isCreatedOrUpdated: false,
            alert: {
                variant: '',
                text: ''
            }
        }
    }
}

export default adStateCreator