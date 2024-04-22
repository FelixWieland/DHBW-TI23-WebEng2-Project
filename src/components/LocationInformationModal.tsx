import { Sheet } from "framework7-react";
import '../css/location-information-modal.css'

interface LocationInformationModalProps {
    content?: React.ReactNode
    onDismiss: () => void
}

export const LocationInformationModal: React.FC<LocationInformationModalProps> = ({
    content,
    onDismiss
}) => {
    return (<>
        <style dangerouslySetInnerHTML={{
            __html: `.location-information-modal-root { --f7-sheet-breakpoint: calc(85vh); }`
        }} />
        <Sheet
            opened={Boolean(content)}
            onSheetClosed={onDismiss}
            swipeToClose
            style={{ height: 'auto', maxHeight: '100vh' }}
            breakpoints={[0.15, 0.45, 1]}

            backdrop={false}
            className="location-information-modal-root modal-in-breakpoint"
        >
            <div className="location-information-modal-swipe-handler" style={{ backgroundColor: 'transparent' }}></div>
            <div className="location-information-modal-content">
                {content}
            </div>
        </Sheet>
    </>
    )
};