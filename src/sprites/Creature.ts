import { Sprite } from "./Sprite.js";
import { GameMap } from "../GameMap.js";
import { FinalBoss } from "./FinalBoss.js";

/**
 * A Creature is a Sprite that is affected by gravity and can die.
 * It can also effect the Map on which it exists.
 */

export enum CreatureState { DEAD, DYING, NORMAL };

export class Creature extends Sprite {

    DIE_TIME = 1000;

    state:CreatureState;
    stateTime:number;

    constructor() {
        super();
        this.state=CreatureState.NORMAL;
        this.stateTime=0;
    }

    clone() {
         let s = super.clone();
         s.state = this.state;
         s.stateTime = this.stateTime;
         return s;
    }

    effectMap(map:GameMap) {

    }

    getState() {
        return this.state;
    }

    setState(st:CreatureState) {
        if (st!=this.state) {
            this.stateTime=0;
            this.state=st;
            if (this.state == CreatureState.DYING) {
                this.setVelocity(0,0);
                if (this.currAnimName.toUpperCase().includes("LEFT")) {
                    console.log("deadLeft");
                    this.setAnimation("deadLeft");
                }
                if (this.currAnimName.toUpperCase().includes("RIGHT")) {
                    console.log("deadRight");
                    this.setAnimation("deadRight");
                }
            }
        }
    }

    wakeUp() {
        if (this.getState() == CreatureState.NORMAL && this.velocity.x == 0) {
            this.setVelocity(-this.getMaxSpeed(),0);
        }
    }

    getMaxSpeed() {
        return 0;
    }

    update(deltaTime:number) {
        let newAnim=""
        if (this.velocity.x < 0 ) {
            newAnim="left";
        } else if (this.velocity.x > 0) {
            newAnim="right";
        }
        if (newAnim!="" && newAnim!=this.currAnimName) {
            this.setAnimation(newAnim);    
        } else {
            super.update(deltaTime);
        }
        this.stateTime+=deltaTime;
        if (this.state == CreatureState.DYING && this.stateTime > this.DIE_TIME) {
            this.setState(CreatureState.DEAD);
        }
    }

}

export class Grub extends Creature {
    getMaxSpeed() {
        return 0.05;
    }
}

export class Fly extends Creature {

    isFlying() {
        return this.state==CreatureState.NORMAL;
    }

    getMaxSpeed() {
        return 0.15;
    }
}