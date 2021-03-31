import React from "react";
import AdForm from "../../Components/AdForm/AdForm";
import IsAuthenticated from "../../hoc/IsAuthenticated";

const AdCreatePage = () => {
    return (
        <IsAuthenticated userRoles={['user']}>
            <AdForm action={'/api/ads/create'} />
        </IsAuthenticated>
    )
}

export default AdCreatePage