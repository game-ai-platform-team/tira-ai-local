import { AbstractNode, Game, MoveDescriptor, Position, pgnWrite } from "kokopu";


export function createPGNString(
    moves: MoveDescriptor[],
    whiteName?: string,
    blackName?: string,
    whiteElo?: number,
    blackElo?: number
) {
    const game = new Game();
    game.date(new Date());
    game.site("tira-ai-local");
    game.playerName("w", whiteName);
    game.playerName("b", blackName);
    game.playerElo("w", whiteElo);
    game.playerElo("b", blackElo);

    const position = new Position("start");

    let current: AbstractNode = game.mainVariation();
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        const move_san = position.notation(move)
        position.play(move_san);
        current = current.play(move_san.toString())
    }

    const text = pgnWrite(game);

    return text;
}
