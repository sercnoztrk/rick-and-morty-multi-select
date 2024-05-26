interface HighlightedTextProps {
    text: string;
    highlight: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, highlight }) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return (
    <span>
        {parts.map((part, i) => (
        <span key={i} style={{fontWeight: part.toLowerCase() === highlight.toLowerCase() ? 'bold' : 'normal'}}>
            {part}
        </span>
        ))}
    </span>
    );
};

export default HighlightedText;
