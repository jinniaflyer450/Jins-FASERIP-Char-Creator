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

    determineResourceNum(table){
        let percentileNum = rollPercentile();
        let resourceNums = null;
        table.forEach(function(percentileRange, resourceNumRange){
            if(percentileNum >= percentileRange[0] && percentileNum <= percentileRange[1]){
                resourceNums = resourceNumRange;
            }
        })
        return resourceNums;
    }
}

class AlteredHuman extends Hero{
    constructor(name, type, primaryAbilities){
        super(name, type, primaryAbilities);
        let increasedAbility = changeAbilityRank(this.abilities, 'random', 1);
        this.increasedAbilityRecord = `Increased ${capitalizeString(increasedAbility)}.`
        this.determineHealthAndKarma();
        this.determineResources();
        this.startingAndMaxPowers = this.determineResourceNum(powerNumTable);
        this.startingAndMaxTalents = this.determineResourceNum(talentNumTable);
        this.startingAndMaxContacts = this.determineResourceNum(contactNumTable);
        this.powerTypesArray = [];
        for(let index = 0; index < this.startingAndMaxPowers[0]; index++){
            this.powerTypesArray.push(rollSelect(powerCategoriesTable)[0]);    
        }
        this.powers = selectPowers(this.powerTypesArray);
        let powerRank = null;
        this.powersWithRanks = {};
        for(let power of this.powers){ 
            powerRank = rollSelect(robotAbilityRanks);
            this.powersWithRanks[power] = powerRank[0];
        }
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
        this.startingAndMaxPowers = this.determineResourceNum(powerNumTable);
        if(this.startingAndMaxPowers[0] < this.startingAndMaxPowers[1]){
            this.startingAndMaxPowers[0]++
        }
        this.startingAndMaxTalents = this.determineResourceNum(talentNumTable);
        this.startingAndMaxContacts = this.determineResourceNum(contactNumTable);
        this.powerTypesArray = [];
        for(let index = 0; index < this.startingAndMaxPowers[0]; index++){
            this.powerTypesArray.push(rollSelect(powerCategoriesTable)[0]);    
        }
        this.powers = selectPowers(this.powerTypesArray);
        let powerRank = null;
        this.powersWithRanks = {};
        for(let power of this.powers){ 
            powerRank = rollSelect(robotAbilityRanks);
            this.powersWithRanks[power] = powerRank[0];
        }
    }
}

class HiTech extends Hero{
    constructor(name, type, primaryAbilities){
        super(name, type, primaryAbilities);
        let increasedAbility = changeAbilityRank(this.abilities, 'reason', 2);
        this.increasedAbilityRecord = `Increased ${capitalizeString(increasedAbility)} by 2.`
        this.determineHealthAndKarma();
        this.determineResources();
        this.startingAndMaxPowers = this.determineResourceNum(powerNumTable);
        this.startingAndMaxTalents = this.determineResourceNum(talentNumTable);
        this.startingAndMaxContacts = this.determineResourceNum(contactNumTable);
        if(this.startingAndMaxContacts[0] === 0){
            this.startingAndMaxContacts[0]++
        }
        this.powerTypesArray = [];
        for(let index = 0; index < this.startingAndMaxPowers[0]; index++){
            this.powerTypesArray.push(rollSelect(powerCategoriesTable)[0]);    
        }
        this.powers = selectPowers(this.powerTypesArray);
        let powerRank = null;
        this.powersWithRanks = {};
        for(let power of this.powers){ 
            powerRank = rollSelect(robotAbilityRanks);
            this.powersWithRanks[power] = powerRank[0];
        }
    }
}

class Robot extends Hero{
    constructor(name, type, primaryAbilities){
        super(name, type, primaryAbilities);
        this.popularity = 0;
        this.determineHealthAndKarma();
        this.determineResources();
        this.startingAndMaxPowers = this.determineResourceNum(powerNumTable);
        this.startingAndMaxTalents = this.determineResourceNum(talentNumTable);
        this.startingAndMaxContacts = this.determineResourceNum(contactNumTable);
        this.powerTypesArray = [];
        for(let index = 0; index < this.startingAndMaxPowers[0]; index++){
            this.powerTypesArray.push(rollSelect(powerCategoriesTable)[0]);    
        }
        this.powers = selectPowers(this.powerTypesArray);
        let powerRank = null;
        this.powersWithRanks = {};
        for(let power of this.powers){ 
            powerRank = rollSelect(robotAbilityRanks);
            this.powersWithRanks[power] = powerRank[0];
        }
    }
}

class Alien extends Hero{
    constructor(name, type, primaryAbilities){
        super(name, type, primaryAbilities);
        this.determineHealthAndKarma();
        this.determineResources();
        this.startingAndMaxPowers = this.determineResourceNum(powerNumTable);
        if(this.startingAndMaxPowers[0] < 2){
            this.startingAndMaxPowers[0]--
        }
        this.startingAndMaxTalents = this.determineResourceNum(talentNumTable);
        this.startingAndMaxContacts = randomChoice([0, 1]);
        this.powerTypesArray = [];
        for(let index = 0; index < this.startingAndMaxPowers[0]; index++){
            this.powerTypesArray.push(rollSelect(powerCategoriesTable)[0]);    
        }
        this.powers = selectPowers(this.powerTypesArray);
        let powerRank = null;
        this.powersWithRanks = {};
        for(let power of this.powers){ 
            powerRank = rollSelect(robotAbilityRanks);
            this.powersWithRanks[power] = powerRank[0];
        }
    }
}