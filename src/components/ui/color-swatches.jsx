export function ColorSwatches({ colors, selectedIndex, onSelect, size = 'md' }) {
    if (!colors || colors.length < 2) return null;

    const dimension = size === 'sm' ? 'h-6 w-6' : 'h-9 w-9';

    return (
        <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Color"
        >
            {colors.map((color, index) => {
                const isSelected = index === selectedIndex;

                return (
                    <button
                        key={color.name}
                        type="button"
                        aria-pressed={isSelected}
                        aria-label={color.name}
                        title={color.name}
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            onSelect(index);
                        }}
                        className={`${dimension} shrink-0 cursor-pointer overflow-hidden rounded-full border-2 p-0.5 transition ${
                            isSelected
                                ? 'border-slate-900'
                                : 'border-transparent hover:border-slate-300'
                        }`}
                    >
                        <img
                            src={color.image}
                            alt=""
                            className="h-full w-full rounded-full object-cover"
                        />
                    </button>
                );
            })}
        </div>
    );
}
