export const fullHand = (n :number) => n === 7

export function hasTwoPairs(cards: number[],n : number) {
    const nRank = cards.length
    if (nRank <= n-2) return true
    return false
}

export function hasConsecutive(sortedNumbers: number[], n: number) {
    let consecutiveCount = 1;

    for (let i = 1; i < sortedNumbers.length; i++) {
        if (sortedNumbers[i] === sortedNumbers[i - 1] + 1) {
            consecutiveCount++;
            if (consecutiveCount === n) {
                console.log(`has ${n} consecutives`)
                return true;
            }
        } else if (sortedNumbers[i] !== sortedNumbers[i - 1]) {
            consecutiveCount = 1;
        }
    }

    return false;
}

export function hasSameSuit(suitList: string[], n: number, totalCards:number) {
    return suitList.length <= totalCards - n + 1
}

export function checkRoyalFlush(holeCards: string[], riverCards: string[]) {
    if (!holeCards.includes("AH") && !riverCards.includes("AH")) return false
    if (!holeCards.includes("KH") && !riverCards.includes("KH")) return false
    if (!holeCards.includes("QH") && !riverCards.includes("QH")) return false
    if (!holeCards.includes("JH") && !riverCards.includes("JH")) return false
    if (!holeCards.includes("10H") && !riverCards.includes("10H")) return false
    return true
}

// export function checkStraightFlush