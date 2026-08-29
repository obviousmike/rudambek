export function TruckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
            <path d="M1.5 6h11v10h-11z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.5 10h4l3 3.2V16h-7z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="5.5" cy="17.5" r="1.6" />
            <circle cx="16.5" cy="17.5" r="1.6" />
        </svg>
    );
}

export function ShieldIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
            <path
                d="M12 2.5l7.5 3v5.3c0 4.6-3.1 8.6-7.5 9.7-4.4-1.1-7.5-5.1-7.5-9.7V5.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M9 12l2 2 4-4.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function ReturnIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
            <path
                d="M3.5 12a8.5 8.5 0 1 0 2.7-6.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M3.2 3.5v4.3h4.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function PinIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
            <path
                d="M12 21.5S5 15.2 5 9.8a7 7 0 1 1 14 0c0 5.4-7 11.7-7 11.7z"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="12" cy="9.6" r="2.4" />
        </svg>
    );
}
