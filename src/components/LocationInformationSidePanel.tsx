import { Button, Icon, Panel } from "framework7-react";
import '../css/location-information-side-panel.css'

interface LocationInformationSidePanelProps {
    content?: React.ReactNode
    onDismiss: () => void
}

export const LocationInformationSidePanel: React.FC<LocationInformationSidePanelProps> = ({
    content,
    onDismiss
}) => {
    return (<>
        <Panel 
            className="location-information-side-panel-root" 
            opened={Boolean(content)} 
            style={{ width: Boolean(content) ? '28vw' : '0px' }}
            left
            backdrop={false}
        >
            {content && (<>
                <Button onClick={onDismiss} className="location-information-side-panel-close-button">
                    <Icon ios="f7:xmark" md="material:close" />
                </Button>
                {content}
            </>)}
        </Panel>
    </>)
};