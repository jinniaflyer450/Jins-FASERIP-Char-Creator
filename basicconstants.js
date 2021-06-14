//A variable to contain a character object and the character's name.
let character = null;
let charName = null;

//An object of hero types and the percentiles rolled to achieve them.
const heroTypes = {'altered-human': [1, 30], 'mutant': [31, 60], 'hi-tech': [61, 90], 'robot': [91, 95], 'alien': [96, 100]};

//An array of the primary abilities.
const abilities = ['fighting', 'agility', 'strength', 'endurance', 'reason', 'intuition', 'psyche'];

//An array of the ability ranks achievable at character creation.
const basicAbilityRanks = ['feeble', 'poor', 'typical', 'good', 'excellent', 'remarkable', 'incredible', 'amazing', 'monstrous'];

//Objects of ability ranks for hero types and the percentiles rolled to achieve them.
const alteredHumanMutantAbilityRanks = {'feeble': [1, 5], 'poor': [6, 10], 'typical': [11, 20], 'good': [21, 40], 
'excellent': [41, 60], 'remarkable': [61, 80], 'incredible': [81, 96], 'amazing': [97, 100]};
const regularHumanAbilityRanks = {'feeble': [1, 5], 'poor': [6, 25], 'typical': [26, 75], 'good': [76, 95], 'excellent': [96, 100]};
const hiTechAbilityRanks = {'feeble': [1, 5], 'poor': [6, 10], 'typical': [11, 40], 'good': [41, 80], 'excellent': [81, 95],
'remarkable': [96, 100]};
const robotAbilityRanks = {'feeble': [1, 5], 'poor': [6, 10], 'typical': [11, 15], 'good': [16, 40], 'excellent': [41, 60],
'remarkable': [61, 70], 'incredible': [71, 90], 'amazing': [91, 98], 'monstrous': [99, 100]};
const alienAbilityRanks = {'feeble': [1, 10], 'poor': [11, 20], 'typical': [21, 30], 'good': [31, 40], 'excellent': [41, 60],
'remarkable': [61, 70], 'incredible': [71, 80], 'amazing': [81, 95], 'monstrous': [96, 100]};

//An object containing the basic character types and the ability ranks they can achieve/the percentiles rolled to achieve them.
const allAbilityRanks = {'altered-human': alteredHumanMutantAbilityRanks, 'mutant': alteredHumanMutantAbilityRanks, 
'normal-human': regularHumanAbilityRanks, 'hi-tech': hiTechAbilityRanks, 'robot': robotAbilityRanks, 'alien': alienAbilityRanks}

//Initial rank numbers for all achievable ranks.
const initialRanksAndRankNumbers = {'feeble': 1, 'poor': 3, 'typical': 5, 'good': 8, 'excellent': 16, 'remarkable': 26, 'incredible': 36,
'amazing': 46, 'monstrous': 63}

const abilityModiferTable = new Map([[-1, [1, 15]], [0, [16, 50]], [1, [51, 70]], [2, [71, 85]], [3, [86, 95]], [4, [96, 100]]]);