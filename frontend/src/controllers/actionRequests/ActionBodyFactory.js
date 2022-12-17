import ResistCard_A_Body from './ResistCard_A_Body';
import ResistCard_B_Body from './ResistCard_B_Body'
import ResistCard_C_Body from './ResistCard_C_Body'
import ResistCard_D_Body from './ResistCard_D_Body'
import ResistCard_E_Body from './ResistCard_E_Body'
import ResistCard_F_Body from './ResistCard_F_Body'
import RestockBody from './RestockBody'
import TravelBody from './TravelBody'
import FightFascismBody from './FightFascismBody'


export default class ActionBodyFactory{
    createActionBody(actionName, requiredInfo){
        const actionMap = new Map();
        actionMap.set('+1 liberation', new ResistCard_A_Body());
        actionMap.set('heal 1', new ResistCard_B_Body(requiredInfo));
        actionMap.set('heal 2', new ResistCard_C_Body(requiredInfo));
        actionMap.set('-2 fascists', new ResistCard_D_Body());
        actionMap.set('teleport', new ResistCard_E_Body(requiredInfo));
        actionMap.set('ears', new ResistCard_F_Body('Ears'));
        actionMap.set('paw', new ResistCard_F_Body('Paw'));
        actionMap.set('tail', new ResistCard_F_Body('Tail'));
        actionMap.set('whiskers', new ResistCard_F_Body('Whiskers'));
        actionMap.set('restock', new RestockBody());
        actionMap.set('travel', new TravelBody(requiredInfo));
        actionMap.set('fightFascism', new FightFascismBody());
        return actionMap.get(actionName);
    }
}