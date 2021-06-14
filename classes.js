class Hero{
    constructor(name, type, primaryAbilities){
        this.name = name;
        this.type = type;
        this.abilities = primaryAbilities;
        this.popularity = 10;
    }
    determineHealthAndKarma(){
        this.maxHealth = determineStartingHealth(this.abilities);
        this.startingKarma = determineStartingKarma(this.abilities);
    }
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach Got help for maps here.
    determineResources(){
        let resourcesColumnRank = 2;
        if(this.type === 'alien'){
            resourcesColumnRank -= 1;
        }
        let columnShift = rollPercentile();
        abilityModiferTable.forEach(function(value, key){
            if(columnShift >= value[0] && columnShift <= value[1]){
                resourcesColumnRank += key;
            }
        })
        if(this.type === 'mutant'){
            resourcesColumnRank--;
        }
        this.resources = basicAbilityRanks[resourcesColumnRank];
    }
}

class AlteredHuman extends Hero{
    constructor(name, type, primaryAbilities){
        super(name, type, primaryAbilities);
        let increasedAbility = changeAbilityRank(this.abilities, 'random', 1);
        this.increasedAbilityRecord = `Increased ${capitalizeString(increasedAbility)}.`
        this.determineHealthAndKarma();
        this.determineResources();
    }
}


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super Needed help with super.

class Mutant extends Hero{
    constructor(name, type, primaryAbilities){
        super(name, type, primaryAbilities);
        this.popularity = 0;
        let increasedAbility = changeAbilityRank(this.abilities, 'endurance', 1);
        this.increasedAbilityRecord = `Increased ${capitalizeString(increasedAbility)}.`
        this.determineHealthAndKarma();
        this.determineResources();
    }
}

class HiTech extends Hero{
    constructor(name, type, primaryAbilities){
        super(name, type, primaryAbilities);
        let increasedAbility = changeAbilityRank(this.abilities, 'reason', 2);
        this.increasedAbilityRecord = `Increased ${capitalizeString(increasedAbility)} by 2.`
        this.determineHealthAndKarma();
        this.determineResources();
    }
}

class Robot extends Hero{
    constructor(name, type, primaryAbilities){
        super(name, type, primaryAbilities);
        this.popularity = 0;
        this.determineHealthAndKarma();
        this.determineResources();
    }
}

class Alien extends Hero{
    constructor(name, type, primaryAbilities){
        super(name, type, primaryAbilities);
        this.determineHealthAndKarma();
        this.determineResources();
    }
}