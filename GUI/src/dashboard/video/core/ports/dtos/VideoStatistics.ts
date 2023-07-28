export type VideoStats = {
    nbrOfViews: number,
    nbrOfAdvices: number,
    coverageRatio: number,
    generalFeedBack: number
}

export const nullVideoStats: VideoStats = {
    nbrOfViews: 0,
    nbrOfAdvices: 0,
    coverageRatio: 0,
    generalFeedBack: 0
} as const