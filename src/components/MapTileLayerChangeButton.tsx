import { Fab, Icon, Actions, ActionsButton, ActionsGroup } from "framework7-react"
import { TileVariant, availableTileLayers } from "../functions/interactiveMap"
import { useCallback, useState } from "react"
import '../css/map-tile-layer-change-button.css'

interface MapTileVariantChangeButtonProps {
    tileVariant: TileVariant,
    onChangeTileVariant: (newVariant: TileVariant) => void
}

export const MapTileVariantChangeButton: React.FC<MapTileVariantChangeButtonProps> = ({
    tileVariant,
    onChangeTileVariant
}) => {
    const [actionsOpened, setActionsOpened] = useState(false)
    const onActionsClose = useCallback(() => setActionsOpened(false), [])
    const onActionsOpen = useCallback(() => setActionsOpened(true), [])

    return (<>
        <Fab className="map-tile-layer-change-button-fab" position="right-bottom" slot="fixed" onClick={onActionsOpen}>
            <Icon ios="material:layers" md="material:layers" />
        </Fab>
        <Actions
            grid={true}
            opened={actionsOpened}
            onActionsClosed={onActionsClose}
        >
            <ActionsGroup>
                {availableTileLayers.map(layer => (
                    <ActionsButton key={layer}>
                        <img
                            slot="media"
                            src={`/thumbnails/map-${layer}.png`}
                            width="48"
                            style={{ maxWidth: '100%', borderRadius: '8px', border: layer === tileVariant ? '4px solid gray' : '' }}
                            onClick={() => onChangeTileVariant(layer)}
                        />
                        <span>{layer}</span>
                    </ActionsButton>
                ))}
            </ActionsGroup>
        </Actions>
    </>
    )
}