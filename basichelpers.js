//A function that chooses randomly between multiple choices.
function randomChoice(choices){
    return choices[Math.floor(Math.random()*choices.length)];
}

//A function that rolls a percentile die.
function rollPercentile(){
    return Math.ceil(Math.random() * 100);
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