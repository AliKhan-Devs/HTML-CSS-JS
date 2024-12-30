// Utility functions
export function getContrastColor(hexcolor) {
    // Remove # if present
    hexcolor = hexcolor.replace('#', '');
    const r = parseInt(hexcolor.slice(0, 2), 16);
    const g = parseInt(hexcolor.slice(2, 4), 16);
    const b = parseInt(hexcolor.slice(4, 6), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
}

export function handleDragStart(e, data) {
    e.dataTransfer.setData('application/json', JSON.stringify(data));
}

export function handleDragOver(e) {
    e.preventDefault();
}