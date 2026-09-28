export function calculateTotalScore(cinematographyScore: string, directorScore: string, performanceScore: string, screenplayScore: string) {
    const cinScore = Number(cinematographyScore) ? Number(cinematographyScore) : 0;
    const dirScore = Number(directorScore) ? Number(directorScore) : 0;
    const prfScore = Number(performanceScore) ? Number(performanceScore) : 0;
    const scrScore = Number(screenplayScore) ? Number(screenplayScore) : 0;

    const totalScore = ((cinScore + dirScore + prfScore + scrScore) / 4).toFixed(1);

    return totalScore;
}