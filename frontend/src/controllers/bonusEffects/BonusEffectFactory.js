import RiseOfBunnies from "./RiseOfBunnies";
import TakeTime from "./TakeTime";
import Turmoil from "./Turmoil";
import WelcomedAsHeroes from "./WelcomedAsHeroes";

export default class BonusEffectFactory {
    createBonusEffect = (bonusCardType) => {
        const bonusEffectMap = new Map();
        bonusEffectMap.set("RiseOfBunnies", new RiseOfBunnies());
        bonusEffectMap.set("WelcomedAsHeroes", new WelcomedAsHeroes());
        bonusEffectMap.set("Turmoil", new Turmoil());
        bonusEffectMap.set("TakeTime", new TakeTime());
        return bonusEffectMap.get(bonusCardType);
    }
}