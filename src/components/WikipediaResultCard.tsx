import { Card } from "framework7-react";
import { WikipediaInformation } from "../functions/locationInformation";

interface WikipediaResultCardProps {
    information: WikipediaInformation
}

export const WikipediaResultCard: React.FC<WikipediaResultCardProps> = ({
    information
}) => {
    return (
        <Card
            outline
            title={information.title}
            content={<span dangerouslySetInnerHTML={{ __html: information.snippet }}/> as any}
            footer={`Letzte Änderung: ${new Date(Date.parse('2024-04-21T17:17:55Z')).toLocaleString()}`}
        />
    )
}