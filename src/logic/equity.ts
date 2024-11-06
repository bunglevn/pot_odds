// @ts-ignore
import PokerHandType, {CategoryShortCutMap, NumberShortCutMap} from "../types/poker-hand.type.ts";

function calculateEquity({
  hole,
  river,
}: {
  hole: string[];
  river: string[];
}) {
}

export function convertImageToCardShortcut(cardList: string[]) {
  const temp = cardList.map((imgPath) => {
    const imgName = imgPath.split("/").pop()
    const card = imgName.split(".")[0].split("_")
    const number = NumberShortCutMap[card[0]] ? NumberShortCutMap[card[0]] : card[0]
    const category = CategoryShortCutMap[card.pop()]
    return number+category
  })
  return temp
}