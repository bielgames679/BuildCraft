/// <reference path="../components/EngineBlock.ts" />
/// <reference path="../components/EngineItem.ts" />
/// <reference path="../EngineHeat.ts" />
/// <reference path="../EngineType.ts" />
/// <reference path="../../Coords.ts" />
/// <reference path="BCEngineTileEntity.ts" />
abstract class BCEngine {
    protected block: EngineBlock;
    protected item: EngineItem;

    protected maxHeat: number = 100;

    constructor(public readonly type: EngineType){
        this.block = new EngineBlock(this.type);
        this.item = new EngineItem(this.type, this.block);

        TileEntity.registerPrototype(this.block.id, new BCEngineTileEntity(this.maxHeat, this.type));
        this.registerUse();
        this.registerDrop();
    }

    private registerUse(){
        Item.registerUseFunction(this.item.stringId, (coords, item, block) => {
            Debug.m(coords.relative);
            this.setBlock(coords.relative);
        });
    }

    private registerDrop(){
        Block.registerDropFunction(this.block.stringId, () => {
            return [[this.item.id, 1, 0]]
        });
    }

    private setBlock(coords: IBlockPos): void {
        World.setBlock(coords.x, coords.y, coords.z, this.block.id, 0);
        World.addTileEntity(coords.x, coords.y, coords.z);
    }
}