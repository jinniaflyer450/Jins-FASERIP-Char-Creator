//A function that chooses randomly between multiple choices.
function randomChoice(choices){
    return choices[Math.floor(Math.random()*choices.length)];
}

//A function that rolls a percentile die.
function rollPercentile(){
    return Math.ceil(Math.random() * 100);
}

//A function that rolls a ten-sided die.
function rollTen(){
    return Math.ceil(Math.random()*10);
}

/*The function that capitalizes/title-cases a string.*/
function capitalizeString(string){
    let capitalizedString = '';
    for(let index = 0; index < string.length; index++){
        if(index === 0 || string[index - 1] === ' ' || string[index - 1] === '-'){
            capitalizedString += string[index].toUpperCase()
        }
        else{
            capitalizedString+= string[index]
        }
    }
    return capitalizedString;
}


//A function that rolls a percentile die, then finds the range in an object that includes the result and returns the name of that range.
function rollSelect(staticValues){
    let percentileNum = rollPercentile();
    let possibleStorageVariable = null;
    for([key, value] of Object.entries(staticValues)){
        if(percentileNum <= value[1] && percentileNum >= value[0]){
            possibleStorageVariable = [key, percentileNum];
        }
        else{
            continue;
        }
    }
    return possibleStorageVariable;
}


//A function that rolls a ten-sided die, then finds the result in a power list and returns the associated power.
function rollSelectPower(powerList){
    let tenSided = rollTen();
    let possibleStorageVariable = null;
    for([key, value] of Object.entries(powerList)){
        if(value.includes(tenSided)){
            possibleStorageVariable = key;
        }
    }
    return possibleStorageVariable;
}

function twoPowerSlotSituation(problemPowerList, power, rolledPowerIndex, rolledPowerTypes, possiblePowerList){
    if(problemPowerList.includes(power) && rolledPowerIndex < rolledPowerTypes.length - 1){
        rolledPowerTypes.pop();
        if(problemPowerList === bonusPowers){
            return [power, bonusPowers[power]];
        }
    }
    else if(problemPowerList.includes(power)){
        while(problemPowerList.includes(power)){
            power = rollSelectPower(possiblePowerList);
        }
    }
    return [power, null];
}

function duplicatePowerSlotSituation(problemPowerList, power, possiblePowerList){
    if(problemPowerList.includes(power)){
        while(problemPowerList.includes(power)){
            power = rollSelectPower(possiblePowerList);
        }
    }
    return power;
}

function selectPowers(rolledPowerTypes){
    let possiblePowerList = null;
    let power = null;
    let powers = [];
    for(let rolledPowerIndex = 0; rolledPowerIndex < rolledPowerTypes.length; rolledPowerIndex++){
        possiblePowerList = powerLists[rolledPowerTypes[rolledPowerIndex]];
        power = rollSelectPower(possiblePowerList);
        power = duplicatePowerSlotSituation(powers, power, possiblePowerList);
        power = twoPowerSlotSituation(doubleSlotPowers, power, rolledPowerIndex, rolledPowerTypes, possiblePowerList)[0];
        let powerAndBonusPower = twoPowerSlotSituation(Object.keys(bonusPowers), power, rolledPowerIndex, rolledPowerTypes, possiblePowerList);
        power = powerAndBonusPower[0]
        powers.push(power);
        if(powerAndBonusPower[1]){
            powers.push(powerAndBonusPower[1]);
        }
    }
    return powers;
}


//Retrieves a value users select in the DOM.
function pickValueFromDom(domValues, generatedValue, staticValues){
    let usableDomValues = [...domValues];
    let possibleStorageVariable = null;
    for(item of usableDomValues){
        if(item.checked && item.value !== generatedValue){
            possibleStorageVariable = [item.value, null];
        }
        else if(item.checked){
            possibleStorageVariable = rollSelect(staticValues);
        }
    }
    return possibleStorageVariable;
}


//A function that modifies a set ability by a given number of ranks.
function basicChangeAbilityRank(characterAbilities, ability, numberRanks){
    let abilityIndex = basicAbilityRanks.indexOf(characterAbilities[ability]);
    abilityIndex += numberRanks;
    if(abilityIndex > (basicAbilityRanks.length - 1)){
        abilityIndex = (basicAbilityRanks.length - 1);
    }
    else if(abilityIndex < 0){
        abilityIndex = 0;
    }
    characterAbilities[ability] = basicAbilityRanks[abilityIndex];
}

//A function that modifies a set ability by a given number of ranks or chooses and modifies an ability by a given number of ranks.
function changeAbilityRank(characterAbilities, ability, numberRanks){
    let modifiedAbility = null;
    if(ability !== 'random'){
        modifiedAbility = ability;
    }
    else{
        modifiedAbility = randomChoice(abilities);
    }
    basicChangeAbilityRank(characterAbilities, modifiedAbility, numberRanks);
    return modifiedAbility;
}

function determineStartingHealth(characterAbilities){
    let fighting = initialRanksAndRankNumbers[characterAbilities['fighting']];
    let agility = initialRanksAndRankNumbers[characterAbilities['agility']];
    let strength = initialRanksAndRankNumbers[characterAbilities['strength']];
    let endurance = initialRanksAndRankNumbers[characterAbilities['endurance']];
    return (fighting + agility + strength + endurance);
}

function determineStartingKarma(characterAbilities){
    let reason = initialRanksAndRankNumbers[characterAbilities['reason']];
    let intuition = initialRanksAndRankNumbers[characterAbilities['intuition']];
    let psyche = initialRanksAndRankNumbers[characterAbilities['psyche']];
    return (reason + intuition + psyche);
}