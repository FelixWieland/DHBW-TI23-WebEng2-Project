import { Fab, Icon, Preloader } from "framework7-react"
import '../css/map-tile-layer-change-button.css'
import { LatLng } from "leaflet"
import { useCallback, useState } from "react"
import { getGeoLocation } from "../functions/locateSelf"

interface LocateSelfButtonProps {
    onChangeOwnLocation: (location: LatLng) => void
}

export const LocateSelfButton: React.FC<LocateSelfButtonProps> = ({
    onChangeOwnLocation
}) => {
    const [locationLoading, setLocationLoading] = useState(false)
    const onLocateSelf = useCallback(() => {
        setLocationLoading(true)
        getGeoLocation((loc) => {
            onChangeOwnLocation(loc)
            setLocationLoading(false)
        })
    }, [])
    
    return (
        <Fab className="map-tile-layer-change-button-fab" style={{ marginBottom: 65 }} position="right-bottom" slot="fixed" onClick={onLocateSelf}>
            {locationLoading ? <Preloader /> : <Icon ios="material:my_location" md="material:my_location" />}
        </Fab>
    )
}