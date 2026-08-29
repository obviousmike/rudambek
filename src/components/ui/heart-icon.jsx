export function HeartIcon({ filled = false, ...props }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.6"
            {...props}
        >
            <path
                d="M12 20.5s-7.5-4.6-10-9.3C.5 8 2 4.5 5.4 4c2.2-.3 4 .9 6.6 3.6C14.6 4.9 16.4 3.7 18.6 4c3.4.5 4.9 4 3.4 7.2-2.5 4.7-10 9.3-10 9.3Z"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
