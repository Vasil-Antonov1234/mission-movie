export function calculateReviewTotalScore(cinematographyScore: string, directorScore: string, performanceScore: string, screenplayScore: string) {
    return ((Number(cinematographyScore) + Number(directorScore) + Number(performanceScore) + Number(screenplayScore))/ 4).toFixed(1);
};