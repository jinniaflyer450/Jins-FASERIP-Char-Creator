//A function that rolls all primary ability ranks for a character.
function rollAbilityRanks(characterType){
    const characterTypeAbilityRanks = allAbilityRanks[characterType];
    let abilityRank = null;
    const characterPrimaryAbilities = {};
    for(ability of abilities){
        abilityRank = rollSelect(characterTypeAbilityRanks)[0];
        characterPrimaryAbilities[ability] = abilityRank; 
    }
    return characterPrimaryAbilities;
}

//A function that resets the generator.
function resetGenerator(){
    document.querySelector('#shows-generated-hero-type').innerText = '';
    for(ability in characterPrimaryAbilities){
        document.querySelector(`#${ability}`).innerText = '';
    }
}

//A function that creates a basic Marvel PC.
function createCharacter(){
    let characterTypeDom = document.getElementsByName('hero-type');
    let characterType = pickValueFromDom(characterTypeDom, 'generated-hero-type', heroTypes);
    if(characterType[1] !== null){
        document.querySelector('#shows-generated-hero-type').innerText = `(picked ${characterType[0]})`
    }
    characterPrimaryAbilities = rollAbilityRanks(characterType[0]);
    for(ability in characterPrimaryAbilities){
        document.querySelector(`#${ability}`).innerText = capitalizeString(characterPrimaryAbilities[ability]);    
    }
    return [characterType[0], characterPrimaryAbilities];
}

document.querySelector('#create-character').addEventListener('click', function(e){
    e.preventDefault();
    character = createCharacter();
})