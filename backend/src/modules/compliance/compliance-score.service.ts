export class ComplianceScoreService {
    static calculateCoverage(mappedWeight: number, totalWeight: number): number {
        if (totalWeight <= 0) {
            return 0;
        }

        return Math.max(0, Math.min(100, Math.round((mappedWeight / totalWeight) * 100)));
    }

    static summarizeCoverage(weights: Array<{ mapped: number; total: number }>): number {
        if (!weights.length) {
            return 0;
        }

        const mapped = weights.reduce((sum, item) => sum + item.mapped, 0);
        const total = weights.reduce((sum, item) => sum + item.total, 0);
        return this.calculateCoverage(mapped, total);
    }
}
