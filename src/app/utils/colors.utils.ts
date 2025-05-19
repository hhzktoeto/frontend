export class ColorsUtils {
    private static readonly nordPalette = [
        '#5E81AC', '#BF616A', '#D08770', '#EBCB8B',
        '#A3BE8C', '#B48EAD', '#88C0D0', '#81A1C1', '#8FBCBB'
    ];

    static generateColorPalette(size: number): string[] {
        const baseColors = this.nordPalette;
        const colors: string[] = [];

        for (let i = 0; i < size; i++) {
            const base = baseColors[i % baseColors.length];
            if (i < baseColors.length) {
                colors.push(base);
            } else {
                // Простая модификация яркости цвета (делает чуть светлее)
                const lighten = 15 + (i * 5) % 30;
                const color = this.lightenColor(base, lighten);
                colors.push(color);
            }
        }

        return colors;
    }

    private static lightenColor(hex: string, percent: number): string {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.min(255, (num >> 16) + percent);
        const g = Math.min(255, ((num >> 8) & 0x00FF) + percent);
        const b = Math.min(255, (num & 0x0000FF) + percent);
        return `rgb(${r}, ${g}, ${b})`;
    }
}