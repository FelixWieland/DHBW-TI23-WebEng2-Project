import { Fab, Icon } from "framework7-react"
import '../css/map-tile-layer-change-button.css'
import { LatLng } from "leaflet"
import { useCallback } from "react"
import { getGeoLocation } from "../functions/locateSelf"

interface LocateSelfButtonProps {
    onChangeOwnLocation: (location: LatLng) => void
}

export const LocateSelfButton: React.FC<LocateSelfButtonProps> = ({
    onChangeOwnLocation
}) => {
    const onLocateSelf = useCallback(() => getGeoLocation(onChangeOwnLocation), [])
    
    return (<>
        <Fab className="map-tile-layer-change-button-fab" style={{ marginBottom: 65 }} position="right-bottom" slot="fixed" onClick={onLocateSelf}>
            <Icon ios="material:my_location" md="material:my_location" />
        </Fab>
    </>
    )
}