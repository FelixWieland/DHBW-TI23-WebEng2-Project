
import { IonActionSheet, IonRippleEffect } from '@ionic/react'
import styles from './LayerChangeButton.module.css'
import { useCallback, useMemo } from 'react'

export const tileVariants = ['street', 'sat'] as const
export type TileVariant = typeof tileVariants[number]

interface LayerChangeButtonProps {
    tileVariant: TileVariant
    onChange: (tileVariant: TileVariant) => void
}

const deTiles = 'https://tile.openstreetmap.de/{z}/{x}/{y}.png'
const satTiles = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

export const LayerChangeButton: React.FC<LayerChangeButtonProps> = ({
    tileVariant,
    onChange
}) => {

    const swappedVariant = useMemo(() => tileVariant === tileVariants[0] ? tileVariants[1] : tileVariants[0], [tileVariant])
    const onClick = useCallback(() => onChange(swappedVariant), [swappedVariant])

    return (<>
        <div 
            onClick={onClick}
            className={`
                ion-activatable 
                ripple-parent 
                rounded-rectangle 
                ${styles.button}
            `}
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), 
                rgba(0, 0, 0, 0.9)), url(/${swappedVariant}.png)`
            }}
        >
            <IonRippleEffect></IonRippleEffect>
            <span>
                {swappedVariant}
            </span>
        </div>
    </>
    );
};
