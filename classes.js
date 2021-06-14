class Hero{
    constructor(name, type, primaryAbilities){
        this.name = name;
        this.type = type;
        this.abilities = primaryAbilities;
        this.popularity = 10;
    }
}

class AlteredHuman extends Hero{
    constructor(name, type, primaryAbilities){
        super(name, type, primaryAbilities);
        let increasedAbility = changeAbilityRank(this.abilities, 'random', 1);
        this.increasedAbilityRecord = `Increased ${capitalizeString(increasedAbility)}.` 
    }
}


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super Needed help with super.

class Mutant extends Hero{
    constructor(name, type, primaryAbilities){
        super(name, type, primaryAbilities);
        this.popularity = 0;
        let increasedAbility = changeAbilityRank(this.abilities, 'endurance', 1);
        this.increasedAbilityRecord = `Increased ${capitalizeString(increasedAbility)}.`
    }
}

class HiTech extends Hero{
    constructor(name, type, primaryAbilities){
        super(name, type, primaryAbilities);
        let increasedAbility = changeAbilityRank(this.abilities, 'reason', 2);
        this.increasedAbilityRecord = `Increased ${capitalizeString(increasedAbility)} by 2.`
    }
}

class Robot extends Hero{
    constructor(name, type, primaryAbilities){
        super(name, type, primaryAbilities);
        this.popularity = 0;
    }
}

class Alien extends Hero{
    constructor(name, type, primaryAbilities){
        super(name, type, primaryAbilities);
    }
}