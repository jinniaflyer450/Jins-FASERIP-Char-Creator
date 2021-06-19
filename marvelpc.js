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
    document.querySelector('#powers').innerText = '';
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
    if(document.querySelector('#fighting').innerText !== ''){
        resetGenerator();
    }
    if(document.querySelector('#char-name').value !== ''){
        charName = document.querySelector('#char-name').value;
    }
    else{
        charName = 'Hero';
    }
    character = createCharacter();
    if(character[0] === 'altered-human'){
        character = new AlteredHuman(charName, 'altered-human', character[1]);
    }
    else if(character[0] === 'mutant'){
        character = new Mutant(charName, 'mutant', character[1]);
    }
    else if(character[0] === 'hi-tech'){
        character = new HiTech(charName, 'hi-tech', character[1]);
    }
    else if(character[0] === 'robot'){
        character = new Robot(charName, 'robot', character[1]);
    }
    else if(character[0] === 'alien'){
        character = new Alien(charName, 'alien', character[1]);
    }
    document.querySelector('#max-health').innerText = character.maxHealth;
    document.querySelector('#starting-karma').innerText = character.startingKarma;
    document.querySelector('#resources').innerText = capitalizeString(character.resources);
    document.querySelector('#popularity').innerText = character.popularity;
    let powerList = document.querySelector('#powers');
    for(power of character.powers){
        let characterPower = document.createElement('li');
        characterPower.innerText = power;
        powerList.append(characterPower);
    }
})

function saveCharacter(){
    let savedBuilds = document.querySelector('#saved-builds');
    let characterWriteup = document.createElement('section');
    let characterName = document.createElement('h3');
    let characterSummary = document.createElement('h4');
    let characterFaserip = document.createElement('p');
    let characterSecondary = document.createElement('p');
    
    characterName.innerText = charName;
    if(character.type === 'altered-human'){
        characterSummary.innerText = 'Hero (Altered Human)';
    }
    else{
        characterSummary.innerText = `Hero (${capitalizeString(character.type)})`;
    }
    for([ability, value] of Object.entries(character.abilities)){
        characterFaserip.innerText += `${capitalizeString(ability)}: ${capitalizeString(value)}, `;
    }
    characterFaserip.length--;
    characterSecondary.innerText += `Max Health: ${character.maxHealth}, `;
    characterSecondary.innerText += `Starting Karma: ${character.startingKarma}, `;
    characterSecondary.innerText += `Resources: ${capitalizeString(character.resources)}, `;
    characterSecondary.innerText += `Popularity: ${character.popularity}`;
    characterWriteup.append(characterName);
    characterWriteup.append(characterSummary);
    characterWriteup.append(characterFaserip);
    characterWriteup.append(characterSecondary);
    characterWriteup.setAttribute('class', 'saved-build');
    savedBuilds.append(characterWriteup);
}

document.querySelector('#save-character').addEventListener('click', function(e){
    e.preventDefault();
    saveCharacter();
})