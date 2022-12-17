import RiseOfBunnies from "./RiseOfBunnies";
import TakeTime from "./TakeTime";
import Turmoil from "./Turmoil";
import WelcomedAsHeroes from "./WelcomedAsHeroes";

export default class BonusEffectFactory {
    createBonusEffect = (bonusCardType) => {
        const bonusEffectMap = new Map();
        bonusEffectMap.set("BonusCard_A", new RiseOfBunnies());
        bonusEffectMap.set("BonusCard_B", new WelcomedAsHeroes());
        bonusEffectMap.set("BonusCard_C", new Turmoil());
        bonusEffectMap.set("BonusCard_D", new TakeTime());
        return bonusEffectMap.get(bonusCardType);
    }
}