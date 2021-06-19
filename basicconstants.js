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

//A map that contains the number of column shifts for rolled ability modifiers.
const abilityModiferTable = new Map([[-1, [1, 15]], [0, [16, 50]], [1, [51, 70]], [2, [71, 85]], [3, [86, 95]], [4, [96, 100]]]);

//A map with starting and max number of powers in an array as a key and the percentile range rolled to achieve those starting numbers in an array as a value.
const powerNumTable = new Map([[[2, 4], [1, 20]], [[3, 4], [21, 60]],[[4, 4], [61, 90]], [[5, 5], [91, 100]]]);

//A map with starting and max number of talents in an array as a key and the percentile range rolled to achieve those starting numbers in an array as a value.
const talentNumTable = new Map([[[1, 6], [1, 20]], [[2, 5], [21, 60]], [[3, 4], [61, 90]], [[4, 4], [91, 100]]]);

//A map with starting and max number of contacts in an array as a key and the percentil range rolled to achieve those starting numbers in an array as a value.
const contactNumTable = new Map([[[0, 4], [1, 20]], [[1, 4], [21, 60]], [[2, 4], [61, 90]], [[3, 4], [91, 100]]]);

//An object with types of powers and the percentiles rolled to select them.
const powerCategoriesTable = {'resistances': [1, 5], 'senses': [6, 10], 'movement': [11, 15], 'matter-control': [16, 25], 
'energy-control': [26, 40], 'body-control': [41, 55], 'distance-attacks': [56, 70], 'mental-powers': [71, 75], 
'body-alterations-offensive': [76, 90], 'body-alterations-defensive': [91, 100]};

//An object with resistance powers and the roll result to get them.
const resistancePowers = {'Resistance: Fire/Heat': [1], 'Resistance: Cold': [2], 'Resistance: Electricity': [3], 'Resistance: Radiation': [4],
'Resistance: Toxins': [5], 'Resistance: Corrosives': [6], 'Resistance: Emotion Attacks': [7], 'Resistance: Mental Attacks': [8], 
'Resistance: Magical Attacks': [9], 'Resistance: Disease': [10]};

//An object with senses powers and the roll result to get them.
const sensesPowers = {'Protected Senses': [1], 'Enhanced Senses': [2], 'Infravision': [3], 'Computer Links': [4], 'Emotion Detection': [5], 
'Energy Detection': [6], 'Magnetic Detection': [7], 'Psionic Detection': [8], 'Astral Detection': [9], 'Tracking Ability': [10]};

//An object with movement powers and the roll result to get them.
const movementPowers = {'Flight': [1, 2], 'Gliding': [3], 'Leaping': [4], 'Wall-Crawling': [5, 6], 'Lightning Speed': [7], 'Levitation': [8],
'Swimming': [9], 'Climbing': [10]};

//An object with matter control powers and the roll result to get them.
const matterControlPowers = {'Earth Control': [1, 2], 'Air Control': [3, 4], 'Fire Control': [5, 6], 'Water Control': [7, 8],
'Weather Control': [9, 10]};

//An object with energy control powers and the roll result to get them.
const energyControlPowers = {'Magnetic Manipulation': [1, 2], 'Electrical Manipulation': [3, 4], 'Light Manipulation': [5, 6],
'Sound Manipulation': [7, 8], 'Darkforce Manipulation': [9], 'Gravity Manipulation': [10]};

//An object with body control powers and the roll result to get them.
const bodyControlPowers = {'Growth': [1], 'Shrinking': [2], 'Invisibility': [3], 'Plasticity': [4], 'Shapeshifting': [5],
'Body Transformation': [6], 'Animal Transformation--Self': [7], 'Raise Lowest Ability': [8], 'Blending': [9], 'Alter Ego': [10]};

//An object with distance attack powers and the roll result to get them.
const distanceAttackPowers = {'Projectile Missle': [1], 'Ensnaring Missle': [2], 'Ice Generation': [3], 'Fire Generation': [4],
'Energy Generation': [5], 'Sound Generation': [6], 'Stunning Generation': [7], 'Corrosive Missle': [8], 'Slashing Missle': [9],
'Darkforce Generation': [10]};

//An object with mental powers and the roll result to get them.
const mentalAttackPowers = {'Telepathy': [1], 'Image Generation': [2], 'Telekinesis': [3], 'Force Field Generation': [4],
'Animal Communication And Control': [5], 'Empathy': [6], 'Psi-Screen': [7], 'Mental Probe': [8], 'Astral Projection': [9],
'Psionic Attack': [10]};

//An object with offensive body alteration powers and the roll result to get them.
const offensiveBodyAlterationPowers = {'Extra Body Parts': [1, 2, 3], 'Extra Attacks': [4], 'Energy Touch': [5], 'Paralyzing Touch': [6],
'Claws': [7, 8], 'Rotting Touch': [9], 'Corrosive Touch': [10]};

//An object with defensive body alteration powers and the roll result to get them.
const defensiveBodyAlterationPowers = {'Body Armor': [1, 2, 3], 'Water Breathing': [4], 'Absorption': [5], 'Regeneration': [6],
'Solar Regeneration': [7], 'Recovery': [8, 9], 'Life Support': [10]};

//An object with all power categories and their associated powers/results on a ten-sided die.
const powerLists = {'resistances': resistancePowers, 'senses': sensesPowers, 'movement': movementPowers, 'matter-control': matterControlPowers,
'energy-control': energyControlPowers, 'body-control': bodyControlPowers, 'distance-attacks': distanceAttackPowers, 
'mental-powers': mentalAttackPowers, 'body-alterations-offensive': offensiveBodyAlterationPowers, 
'body-alterations-defensive': defensiveBodyAlterationPowers};

//An object containing all roll-achievable powers with bonus powers and those bonus powers.
const bonusPowers = {'Plasticity': 'Elongation'};

//An array containing all roll-achievable powers that count as two power slots.
const doubleSlotPowers = ['Body Transformation', 'Image Generation']; 
