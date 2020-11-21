declare module Lib {
    function frameNames(): any;
    function functions(): any;
    function abort(): any;
    function abort(string: any): any;
    function addItemCondition(arg1: any, arg2: any): any;
    function advCost(skill: any): any;
    function adv1(locationValue: any, adventuresUsedValue: any, filterFunction: any): any;
    function adventure(arg1: any, arg2: any): any;
    function adventure(arg1: any, arg2: any, filterFunction: any): any;
    function allMonstersWithId(): any;
    function allNormalOutfits(): any;
    function appearanceRates(location: any): any;
    function appearanceRates(location: any, includeQueue: any): any;
    function append(buffer: any, s: any): any;
    function appendReplacement(matcher: any, buffer: any, replacement: any): any;
    function appendTail(matcher: any, buffer: any): any;
    function attack(): any;
    function autosell(arg1: any, arg2: any): any;
    function autosellPrice(item: any): any;
    function availableAmount(arg: any): any;
    function availableChoiceOptions(): any;
    function availableChoiceOptions(spoilers: any): any;
    function availableChoiceSelectInputs(decision: any): any;
    function availableChoiceTextInputs(decision: any): any;
    function availablePocket(arg: any): any;
    function batchClose(): any;
    function batchOpen(): any;
    function bjornifyFamiliar(familiar: any): any;
    function blackMarketAvailable(): any;
    function booleanModifier(modifier: any): any;
    function booleanModifier(arg: any, modifier: any): any;
    function buffedHitStat(): any;
    function bufferToFile(var1: any, var2: any): any;
    function buy(item: any): any;
    function buy(arg1: any, arg2: any): any;
    function buy(arg1: any, arg2: any, arg3: any): any;
    function buyPrice(master: any, item: any): any;
    function buyUsingStorage(item: any): any;
    function buyUsingStorage(arg1: any, arg2: any): any;
    function buyUsingStorage(arg1: any, arg2: any, arg3: any): any;
    function buysItem(master: any, item: any): any;
    function canDrink(): any;
    function canEat(): any;
    function canEquip(item: any): any;
    function canEquip(familiar: any, item: any): any;
    function canFaxbot(arg: any): any;
    function canInteract(): any;
    function canStillSteal(): any;
    function canadiaAvailable(): any;
    function candyForTier(arg: any): any;
    function candyForTier(arg1: any, arg2: any): any;
    function ceil(arg: any): any;
    function changeMcd(level: any): any;
    function charAt(source: any, index: any): any;
    function chatClan(messageValue: any): any;
    function chatClan(messageValue: any, recipientValue: any): any;
    function chatMacro(macroValue: any): any;
    function chatNotify(messageValue: any, colorValue: any): any;
    function chatPrivate(recipientValue: any, messageValue: any): any;
    function chew(item: any): any;
    function chew(arg1: any, arg2: any): any;
    function choiceFollowsFight(): any;
    function classModifier(arg: any, modifier: any): any;
    function clear(arg: any): any;
    function cliExecute(string: any): any;
    function cliExecuteOutput(string: any): any;
    function closetAmount(arg: any): any;
    function combatManaCostModifier(): any;
    function combatRateModifier(): any;
    function containsText(source: any, search: any): any;
    function council(): any;
    function count(arg: any): any;
    function craft(modeValue: any, countValue: any, item1: any, item2: any): any;
    function craftType(arg: any): any;
    function creatableAmount(arg: any): any;
    function creatableTurns(itemId: any): any;
    function creatableTurns(itemId: any, count: any): any;
    function creatableTurns(itemId: any, count: any, freeCrafting: any): any;
    function create(item: any): any;
    function create(arg1: any, arg2: any): any;
    function createMatcher(patternValue: any, stringValue: any): any;
    function currentHitStat(): any;
    function currentMcd(): any;
    function currentPvpStances(): any;
    function currentRadSickness(): any;
    function currentRound(): any;
    function dadSeaMonkeeWeakness(arg: any): any;
    function dailySpecial(): any;
    function damageAbsorptionPercent(): any;
    function damageReduction(): any;
    function dateToTimestamp(inFormat: any, dateTimeString: any): any;
    function debugprint(string: any): any;
    function descToEffect(value: any): any;
    function descToItem(value: any): any;
    function disable(name: any): any;
    function dispensaryAvailable(): any;
    function displayAmount(arg: any): any;
    function drink(item: any): any;
    function drink(arg1: any, arg2: any): any;
    function drinksilent(item: any): any;
    function drinksilent(arg1: any, arg2: any): any;
    function dump(): any;
    function dump(arg: any): any;
    function dump(arg: any, color: any): any;
    function eat(item: any): any;
    function eat(arg1: any, arg2: any): any;
    function eatsilent(item: any): any;
    function eatsilent(arg1: any, arg2: any): any;
    function effectModifier(arg: any, modifier: any): any;
    function effectPockets(): any;
    function elementalResistance(): any;
    function elementalResistance(arg: any): any;
    function emptyCloset(): any;
    function enable(name: any): any;
    function end(matcher: any): any;
    function end(matcher: any, group: any): any;
    function endsWith(source: any, suffix: any): any;
    function enthroneFamiliar(familiar: any): any;
    function entityDecode(arg: any): any;
    function entityEncode(arg: any): any;
    function equip(item: any): any;
    function equip(arg1: any, arg2: any): any;
    function equipAllFamiliars(): any;
    function equippedAmount(arg: any): any;
    function equippedItem(slot: any): any;
    function eudora(): any;
    function eudora(newEudora: any): any;
    function everyCardName(name: any): any;
    function expectedDamage(): any;
    function expectedDamage(arg: any): any;
    function experienceBonus(): any;
    function expressionEval(expr: any): any;
    function extractItems(string: any): any;
    function extractMeat(string: any): any;
    function familiarEquipment(familiar: any): any;
    function familiarEquippedEquipment(familiar: any): any;
    function familiarWeight(familiar: any): any;
    function favoriteFamiliars(): any;
    function faxbot(monsterName: any): any;
    function faxbot(monsterName: any, botName: any): any;
    function fightFollowsChoice(): any;
    function fileToArray(var1: any): any;
    function fileToBuffer(var1: any): any;
    function fileToMap(var1: any, var2: any): any;
    function fileToMap(var1: any, var2: any, var3: any): any;
    function find(matcher: any): any;
    function findMethod(args: any): any;
    function floor(arg: any): any;
    function floristAvailable(): any;
    function flushMonsterManuelCache(): any;
    function formField(key: any): any;
    function formFields(): any;
    function formatDateTime(inFormat: any, dateTimeString: any, outFormat: any): any;
    function friarsAvailable(): any;
    function fuelCost(skill: any): any;
    function fullnessLimit(): any;
    function gamedayToInt(): any;
    function gamedayToString(): any;
    function gametimeToInt(): any;
    function getAllProperties(filterValue: any, globalValue: any): any;
    function getAutoAttack(): any;
    function getCampground(): any;
    function getCcsAction(index: any): any;
    function getChateau(): any;
    function getClanId(): any;
    function getClanLounge(): any;
    function getClanName(): any;
    function getClanRumpus(): any;
    function getCloset(): any;
    function getCounters(label: any, min: any, max: any): any;
    function getCustomOutfits(): any;
    function getDwelling(): any;
    function getFloristPlants(): any;
    function getFreePulls(): any;
    function getFuel(): any;
    function getGoals(): any;
    function getIgnoreZoneWarnings(): any;
    function getIngredients(arg: any): any;
    function getInventory(): any;
    function getLocationMonsters(location: any): any;
    function getMonsterMapping(): any;
    function getMonsterMapping(path: any): any;
    function getMonsters(location: any): any;
    function getMoods(): any;
    function getOutfits(): any;
    function getPath(): any;
    function getPathFull(): any;
    function getPathVariables(): any;
    function getPlayerId(playerNameValue: any): any;
    function getPlayerName(playerIdValue: any): any;
    function getPower(item: any): any;
    function getProperty(name: any): any;
    function getProperty(name: any, globalValue: any): any;
    function getRelated(item: any, type: any): any;
    function getRevision(): any;
    function getShop(): any;
    function getShopLog(): any;
    function getStackTrace(): any;
    function getStash(): any;
    function getStorage(): any;
    function getVersion(): any;
    function getFunctions(): any;
    function gnomadsAvailable(): any;
    function goalExists(check: any): any;
    function group(matcher: any): any;
    function group(matcher: any, group: any): any;
    function groupCount(matcher: any): any;
    function groupNames(matcher: any): any;
    function groupString(string: any, regex: any): any;
    function guildStoreAvailable(): any;
    function handlingChoice(): any;
    function haveBartender(): any;
    function haveChef(): any;
    function haveDisplay(): any;
    function haveEffect(arg: any): any;
    function haveEquipped(item: any): any;
    function haveFamiliar(familiar: any): any;
    function haveMushroomPlot(): any;
    function haveOutfit(outfit: any): any;
    function haveServant(servant: any): any;
    function haveShop(): any;
    function haveSkill(arg: any): any;
    function hedgeMaze(arg: any): any;
    function hermit(arg1: any, arg2: any): any;
    function hiddenTempleUnlocked(): any;
    function hippyStoneBroken(): any;
    function hippyStoreAvailable(): any;
    function historicalAge(item: any): any;
    function historicalPrice(item: any): any;
    function holiday(): any;
    function hpCost(skill: any): any;
    function imageToMonster(value: any): any;
    function inBadMoon(): any;
    function inHardcore(): any;
    function inMoxieSign(): any;
    function inMultiFight(): any;
    function inMuscleSign(): any;
    function inMysticalitySign(): any;
    function inaccessibleReason(master: any): any;
    function indexOf(source: any, search: any): any;
    function indexOf(source: any, search: any, start: any): any;
    function inebrietyLimit(): any;
    function initiativeModifier(): any;
    function insert(buffer: any, index: any, s: any): any;
    function isAccessible(master: any): any;
    function isBanished(arg: any): any;
    function isCoinmasterItem(item: any): any;
    function isDiscardable(item: any): any;
    function isDisplayable(item: any): any;
    function isFamiliarEquipmentLocked(): any;
    function isGiftable(item: any): any;
    function isGoal(item: any): any;
    function isInteger(string: any): any;
    function isNpcItem(item: any): any;
    function isOnline(arg: any): any;
    function isTradeable(item: any): any;
    function isTrendy(thing: any): any;
    function isUnrestricted(thing: any): any;
    function isWearingOutfit(outfit: any): any;
    function itemAmount(arg: any): any;
    function itemDropModifier(): any;
    function itemDrops(): any;
    function itemDrops(arg: any): any;
    function itemDropsArray(): any;
    function itemDropsArray(monster: any): any;
    function itemDropsArray(arg: any): any;
    function itemPockets(): any;
    function itemType(item: any): any;
    function jokePockets(): any;
    function jumpChance(): any;
    function jumpChance(arg: any): any;
    function jumpChance(arg: any, init: any): any;
    function jumpChance(arg: any, init: any, ml: any): any;
    function knollAvailable(): any;
    function lastChoice(): any;
    function lastDecision(): any;
    function lastIndexOf(source: any, search: any): any;
    function lastIndexOf(source: any, search: any, start: any): any;
    function lastItemMessage(): any;
    function lastMonster(): any;
    function lastSkillMessage(): any;
    function leetify(string: any): any;
    function length(string: any): any;
    function lightningCost(skill: any): any;
    function limitMode(): any;
    function loadHtml(string: any): any;
    function lockFamiliarEquipment(lock: any): any;
    function logN(arg: any): any;
    function logN(arg: any, base: any): any;
    function logprint(string: any): any;
    function makeUrl(arg1: any, arg2: any, arg3: any): any;
    function mallPrice(item: any): any;
    function mallPrices(arg: any): any;
    function mallPrices(category: any, tiers: any): any;
    function manaCostModifier(): any;
    function mapToFile(var1: any, var2: any): any;
    function mapToFile(var1: any, var2: any, var3: any): any;
    function max(arg1: any, arg2: any): any;
    function maximize(maximizerStringValue: any, isSpeculateOnlyValue: any): any;
    function maximize(maximizerStringValue: any, maxPriceValue: any, priceLevelValue: any, isSpeculateOnlyValue: any): any;
    function maximize(maximizerStringValue: any, maxPriceValue: any, priceLevelValue: any, isSpeculateOnlyValue: any, showEquipment: any): any;
    function meatDrop(): any;
    function meatDrop(arg: any): any;
    function meatDropModifier(): any;
    function meatPockets(): any;
    function min(arg1: any, arg2: any): any;
    function minstrelInstrument(): any;
    function minstrelLevel(): any;
    function minstrelQuest(): any;
    function modifierEval(expr: any): any;
    function monsterAttack(): any;
    function monsterAttack(arg: any): any;
    function monsterDefense(): any;
    function monsterDefense(arg: any): any;
    function monsterElement(): any;
    function monsterElement(arg: any): any;
    function monsterEval(expr: any): any;
    function monsterFactoidsAvailable(arg1: any, arg2: any): any;
    function monsterHp(): any;
    function monsterHp(arg: any): any;
    function monsterInitiative(): any;
    function monsterInitiative(arg: any): any;
    function monsterLevelAdjustment(): any;
    function monsterManuelText(arg: any): any;
    function monsterPhylum(): any;
    function monsterPhylum(arg: any): any;
    function monsterPockets(): any;
    function moodExecute(multiplicity: any): any;
    function moodList(): any;
    function moonLight(): any;
    function moonPhase(): any;
    function mpCost(skill: any): any;
    function myAbsorbs(): any;
    function myAdventures(): any;
    function myAscensions(): any;
    function myAudience(): any;
    function myBasestat(arg: any): any;
    function myBjornedFamiliar(): any;
    function myBuffedstat(arg: any): any;
    function myClass(): any;
    function myClosetMeat(): any;
    function myCompanion(): any;
    function myDaycount(): any;
    function myDiscomomentum(): any;
    function myEffectiveFamiliar(): any;
    function myEffects(): any;
    function myEnthronedFamiliar(): any;
    function myFamiliar(): any;
    function myFullness(): any;
    function myFury(): any;
    function myGardenType(): any;
    function myHash(): any;
    function myHp(): any;
    function myId(): any;
    function myInebriety(): any;
    function myLevel(): any;
    function myLightning(): any;
    function myLocation(): any;
    function myMask(): any;
    function myMaxfury(): any;
    function myMaxhp(): any;
    function myMaxmp(): any;
    function myMaxpp(): any;
    function myMeat(): any;
    function myMp(): any;
    function myName(): any;
    function myPath(): any;
    function myPathId(): any;
    function myPokeFam(arg: any): any;
    function myPp(): any;
    function myPrimestat(): any;
    function myRain(): any;
    function myServant(): any;
    function mySessionAdv(): any;
    function mySessionItems(): any;
    function mySessionItems(item: any): any;
    function mySessionMeat(): any;
    function mySign(): any;
    function mySoulsauce(): any;
    function mySpleenUse(): any;
    function myStorageMeat(): any;
    function myThrall(): any;
    function myThunder(): any;
    function myTurncount(): any;
    function myVykeaCompanion(): any;
    function nowToInt(): any;
    function nowToString(dateFormatValue: any): any;
    function npcPrice(item: any): any;
    function numberologyPrize(num: any): any;
    function numericModifier(modifier: any): any;
    function numericModifier(arg: any, modifier: any): any;
    function numericModifier(familiar: any, modifier: any, weight: any, item: any): any;
    function outfit(outfit: any): any;
    function outfitPieces(outfit: any): any;
    function outfitTattoo(outfit: any): any;
    function overdrink(item: any): any;
    function overdrink(arg1: any, arg2: any): any;
    function pathIdToName(value: any): any;
    function pathNameToId(value: any): any;
    function pickPocket(arg: any): any;
    function pickedPockets(): any;
    function pickedScraps(): any;
    function pocketEffects(pocket: any): any;
    function pocketItems(pocket: any): any;
    function pocketJoke(pocket: any): any;
    function pocketMeat(pocket: any): any;
    function pocketMonster(pocket: any): any;
    function pocketPoem(pocket: any): any;
    function pocketScrap(pocket: any): any;
    function pocketStats(pocket: any): any;
    function poemPockets(): any;
    function potentialPockets(arg: any): any;
    function print(): any;
    function print(string: any): any;
    function print(string: any, color: any): any;
    function printHtml(string: any): any;
    function propertyDefaultValue(nameValue: any): any;
    function propertyExists(nameValue: any): any;
    function propertyExists(nameValue: any, globalValue: any): any;
    function propertyHasDefault(nameValue: any): any;
    function pullsRemaining(): any;
    function putCloset(arg1: any): any;
    function putCloset(arg1: any, arg2: any): any;
    function putDisplay(arg1: any, arg2: any): any;
    function putShop(priceValue: any, limitValue: any, itemValue: any): any;
    function putShop(priceValue: any, limitValue: any, qtyValue: any, itemValue: any): any;
    function putShopUsingStorage(priceValue: any, limitValue: any, itemValue: any): any;
    function putShopUsingStorage(priceValue: any, limitValue: any, qtyValue: any, itemValue: any): any;
    function putStash(arg1: any, arg2: any): any;
    function pvpAttacksLeft(): any;
    function rainCost(skill: any): any;
    function random(arg: any): any;
    function rawDamageAbsorption(): any;
    function refreshShop(): any;
    function refreshStash(): any;
    function refreshStatus(): any;
    function removeItemCondition(arg1: any, arg2: any): any;
    function removeProperty(nameValue: any): any;
    function removeProperty(nameValue: any, globalValue: any): any;
    function renameProperty(oldNameValue: any, newNameValue: any): any;
    function replace(buffer: any, start: any, finish: any, s: any): any;
    function replaceAll(matcher: any, replacement: any): any;
    function replaceFirst(matcher: any, replacement: any): any;
    function replaceString(source: any, searchValue: any, replaceValue: any): any;
    function repriceShop(priceValue: any, itemValue: any): any;
    function repriceShop(priceValue: any, limitValue: any, itemValue: any): any;
    function reset(matcher: any): any;
    function reset(matcher: any, input: any): any;
    function restorationPockets(): any;
    function restoreHp(amount: any): any;
    function restoreMp(amount: any): any;
    function retrieveItem(item: any): any;
    function retrieveItem(arg1: any, arg2: any): any;
    function reverseNumberology(): any;
    function reverseNumberology(advDelta: any, spleenDelta: any): any;
    function rollover(): any;
    function round(arg: any): any;
    function runChoice(decision: any): any;
    function runChoice(decision: any, extra: any): any;
    function runChoice(decision: any, custom: any, more: any): any;
    function runCombat(): any;
    function runCombat(filterFunction: any): any;
    function runTurn(): any;
    function runaway(): any;
    function scrapPockets(): any;
    function sell(master: any, countValue: any, itemValue: any): any;
    function sellPrice(master: any, item: any): any;
    function sellsItem(master: any, item: any): any;
    function sessionLogs(dayCount: any): any;
    function sessionLogs(player: any, dayCount: any): any;
    function sessionLogs(playerName: any, baseDate: any, count: any): any;
    function setAutoAttack(attackValue: any): any;
    function setLength(buffer: any, i: any): any;
    function setLocation(location: any): any;
    function setProperty(nameValue: any, value: any): any;
    function shopAmount(arg: any): any;
    function shopLimit(arg: any): any;
    function shopPrice(item: any): any;
    function skillModifier(arg: any, modifier: any): any;
    function slashCount(arg: any): any;
    function soulsauceCost(skill: any): any;
    function spleenLimit(): any;
    function splitString(string: any): any;
    function splitString(string: any, regex: any): any;
    function squareRoot(val: any): any;
    function start(matcher: any): any;
    function start(matcher: any, group: any): any;
    function startsWith(source: any, prefix: any): any;
    function stashAmount(arg: any): any;
    function statBonusToday(): any;
    function statBonusTomorrow(): any;
    function statModifier(arg: any, modifier: any): any;
    function statsPockets(): any;
    function steal(): any;
    function stillsAvailable(): any;
    function stopCounter(label: any): any;
    function storageAmount(arg: any): any;
    function stringModifier(modifier: any): any;
    function stringModifier(arg: any, modifier: any): any;
    function stunSkill(): any;
    function substring(source: any, start: any): any;
    function substring(source: any, start: any, finish: any): any;
    function svnAtHead(project: any): any;
    function svnExists(project: any): any;
    function svnInfo(script: any): any;
    function sweetSynthesis(effect: any): any;
    function sweetSynthesis(arg1: any, arg2: any): any;
    function sweetSynthesis(arg1: any, arg2: any, arg3: any): any;
    function sweetSynthesisPair(arg1: any): any;
    function sweetSynthesisPair(arg1: any, arg2: any): any;
    function sweetSynthesisPairing(arg1: any, arg2: any): any;
    function sweetSynthesisPairing(arg1: any, arg2: any, arg3: any): any;
    function sweetSynthesisResult(item1: any, item2: any): any;
    function takeCloset(arg1: any): any;
    function takeCloset(arg1: any, arg2: any): any;
    function takeDisplay(arg1: any, arg2: any): any;
    function takeShop(itemValue: any): any;
    function takeShop(arg1: any, arg2: any): any;
    function takeStash(arg1: any, arg2: any): any;
    function takeStorage(arg1: any, arg2: any): any;
    function tavern(): any;
    function tavern(arg: any): any;
    function throwItem(item: any): any;
    function throwItems(item1: any, item2: any): any;
    function thunderCost(skill: any): any;
    function timeToString(): any;
    function timestampToDate(timestamp: any, outFormat: any): any;
    function toBoolean(value: any): any;
    function toBounty(value: any): any;
    function toClass(value: any): any;
    function toCoinmaster(value: any): any;
    function toEffect(value: any): any;
    function toElement(value: any): any;
    function toFamiliar(value: any): any;
    function toFloat(value: any): any;
    function toInt(value: any): any;
    function toItem(value: any): any;
    function toItem(name: any, count: any): any;
    function toJson(val: any): any;
    function toLocation(value: any): any;
    function toLowerCase(string: any): any;
    function toMonster(value: any): any;
    function toPhylum(value: any): any;
    function toPlural(item: any): any;
    function toServant(value: any): any;
    function toSkill(value: any): any;
    function toSkill(value1: any, value2: any): any;
    function toSlot(item: any): any;
    function toStat(value: any): any;
    function toString(val: any): any;
    function toString(val: any, fmt: any): any;
    function toThrall(value: any): any;
    function toUpperCase(string: any): any;
    function toUrl(value: any): any;
    function toVykea(value: any): any;
    function todayToString(): any;
    function totalFreeRests(): any;
    function totalTurnsPlayed(): any;
    function towerDoor(): any;
    function traceprint(string: any): any;
    function truncate(arg: any): any;
    function turnsPerCast(skill: any): any;
    function turnsPlayed(): any;
    function twiddle(): any;
    function unusualConstructDisc(): any;
    function updateCandyPrices(): any;
    function urlDecode(arg: any): any;
    function urlEncode(arg: any): any;
    function use(item: any): any;
    function use(arg1: any, arg2: any): any;
    function useFamiliar(familiar: any): any;
    function useServant(servant: any): any;
    function useSkill(skill: any): any;
    function useSkill(arg1: any, arg2: any): any;
    function useSkill(arg1: any, arg2: any, target: any): any;
    function userConfirm(message: any): any;
    function userConfirm(message: any, timeOut: any, defaultBoolean: any): any;
    function visit(master: any): any;
    function visitUrl(): any;
    function visitUrl(string: any): any;
    function visitUrl(string: any, usePostMethod: any): any;
    function visitUrl(string: any, usePostMethod: any, encoded: any): any;
    function votingBoothInitiatives(clss: any, path: any, daycount: any): any;
    function wait(delay: any): any;
    function waitq(delay: any): any;
    function weaponHands(item: any): any;
    function weaponType(item: any): any;
    function weightAdjustment(): any;
    function whiteCitadelAvailable(): any;
    function whoClan(): any;
    function willUsuallyDodge(): any;
    function willUsuallyMiss(): any;
    function write(string: any): any;
    function writeln(string: any): any;
    function xpath(html: any, xpath: any): any;
}
declare abstract class MafiaClass {
    static get<T>(name: string): T;
    static get<T>(names: string[]): T[];
    static all<T>(): T[];
}
declare class Bounty extends MafiaClass {
    /**
     * Plural
     */
    readonly plural: string;
    /**
     * Type
     */
    readonly type: string;
    /**
     * Kol internal type
     */
    readonly kol_internal_type: string;
    /**
     * Number
     */
    readonly number: number;
    /**
     * Image
     */
    readonly image: string;
    /**
     * Monster
     */
    readonly monster: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Location
     */
    readonly location: net.sourceforge.kolmafia.textui.parsetree.Value;
}
declare class Class extends MafiaClass {
    /**
     * Primestat
     */
    readonly primestat: net.sourceforge.kolmafia.textui.parsetree.Value;
}
declare class Coinmaster extends MafiaClass {
    /**
     * Token
     */
    readonly token: string;
    /**
     * Item
     */
    readonly item: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Property
     */
    readonly property: string;
    /**
     * Available tokens
     */
    readonly available_tokens: number;
    /**
     * Buys
     */
    readonly buys: boolean;
    /**
     * Sells
     */
    readonly sells: boolean;
    /**
     * Nickname
     */
    readonly nickname: string;
}
declare class Effect extends MafiaClass {
    /**
     * Name
     */
    readonly name: string;
    /**
     * Default
     */
    readonly default: string;
    /**
     * Quality
     */
    readonly quality: string;
    /**
     * Attributes
     */
    readonly attributes: string;
    /**
     * Note
     */
    readonly note: string;
    /**
     * All
     */
    readonly all: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Image
     */
    readonly image: string;
    /**
     * Descid
     */
    readonly descid: string;
    /**
     * Candy tier
     */
    readonly candy_tier: number;
}
declare class Element extends MafiaClass {
    /**
     * Image
     */
    readonly image: string;
}
declare class Familiar extends MafiaClass {
    /**
     * Hatchling
     */
    readonly hatchling: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Image
     */
    readonly image: string;
    /**
     * Name
     */
    readonly name: string;
    /**
     * Experience
     */
    readonly experience: number;
    /**
     * Charges
     */
    readonly charges: number;
    /**
     * Drop name
     */
    readonly drop_name: string;
    /**
     * Drop item
     */
    readonly drop_item: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Drops today
     */
    readonly drops_today: number;
    /**
     * Drops limit
     */
    readonly drops_limit: number;
    /**
     * Fights today
     */
    readonly fights_today: number;
    /**
     * Fights limit
     */
    readonly fights_limit: number;
    /**
     * Combat
     */
    readonly combat: boolean;
    /**
     * Physical damage
     */
    readonly physical_damage: boolean;
    /**
     * Elemental damage
     */
    readonly elemental_damage: boolean;
    /**
     * Block
     */
    readonly block: boolean;
    /**
     * Delevel
     */
    readonly delevel: boolean;
    /**
     * Hp during combat
     */
    readonly hp_during_combat: boolean;
    /**
     * Mp during combat
     */
    readonly mp_during_combat: boolean;
    /**
     * Other action during combat
     */
    readonly other_action_during_combat: boolean;
    /**
     * Hp after combat
     */
    readonly hp_after_combat: boolean;
    /**
     * Mp after combat
     */
    readonly mp_after_combat: boolean;
    /**
     * Other action after combat
     */
    readonly other_action_after_combat: boolean;
    /**
     * Passive
     */
    readonly passive: boolean;
    /**
     * Underwater
     */
    readonly underwater: boolean;
    /**
     * Variable
     */
    readonly variable: boolean;
    /**
     * Attributes
     */
    readonly attributes: string;
    /**
     * Poke level
     */
    readonly poke_level: number;
    /**
     * Poke level 2 power
     */
    readonly poke_level_2_power: number;
    /**
     * Poke level 2 hp
     */
    readonly poke_level_2_hp: number;
    /**
     * Poke level 3 power
     */
    readonly poke_level_3_power: number;
    /**
     * Poke level 3 hp
     */
    readonly poke_level_3_hp: number;
    /**
     * Poke level 4 power
     */
    readonly poke_level_4_power: number;
    /**
     * Poke level 4 hp
     */
    readonly poke_level_4_hp: number;
    /**
     * Poke move 1
     */
    readonly poke_move_1: string;
    /**
     * Poke move 2
     */
    readonly poke_move_2: string;
    /**
     * Poke move 3
     */
    readonly poke_move_3: string;
    /**
     * Poke attribute
     */
    readonly poke_attribute: string;
}
declare class Item extends MafiaClass {
    /**
     * The name of this Item.
     */
    readonly name: string;
    /**
     * The name of this Item as it appears in your current Two Crazy Random Summer run. If you are not in a TCRS run, the regular Item name is returned.
     */
    readonly tcrs_name: string;
    /**
     * The plural of this Item. If the official plural is not known, returns the name of this Item with an "s" appended.
     */
    readonly plural: string;
    /**
     * The identifier used to see the description of this Item.
     */
    readonly descid: string;
    /**
     * The filename of the image associated with this Item.
     */
    readonly image: string;
    /**
     * The filename of the small image associated with this Item. For items with an image that is usually larger than 30x30, this is their 30x30 equivalent. For example, the images for "folders" from the "over-the-shoulder Folder Holder" will normally be 100x100 but this will return a 30x30 equivalent.
     */
    readonly smallimage: string;
    /**
     * The level requirement for consuming or equipping this Item.
     */
    readonly levelreq: number;
    /**
     * The quality of this Item if it is a consumable, or blank otherwise. Quality can be one of "decent", "crappy", "good", "awesome", "EPIC" or "".
     */
    readonly quality: string;
    /**
     * The range of adventures gained from consuming this Item. The string will either contain the adventures for invariant gains, or a hyphen-separated minimum and maximum for variant gains.
     */
    readonly adventures: string;
    /**
     * The range of muscle substats gained from consuming this Item. The string will either contain the substats for invariant gains, or a hyphen-separated minimum and maximum for variant gains. Note that substat gains can be negative.
     */
    readonly muscle: string;
    /**
     * The range of mysticality substats gained from consuming this Item. The string will either contain the substats for invariant gains, or a hyphen-separated minimum and maximum for variant gains. Note that substat gains can be negative.
     */
    readonly mysticality: string;
    /**
     * The range of moxie substats gained from consuming this Item. The string will either contain the substats for invariant gains, or a hyphen-separated minimum and maximum for variant gains. Note that substat gains can be negative.
     */
    readonly moxie: string;
    /**
     * The stomach size of this Item. If this Item is not edible, returns 0.
     */
    readonly fullness: number;
    /**
     * The liver size of this Item. If this Item is not drinkable, returns 0.
     */
    readonly inebriety: number;
    /**
     * The spleen size of this Item. If this Item is not chewable, returns 0.
     */
    readonly spleen: number;
    /**
     * The minimum HP restored by consuming this Item.
     */
    readonly minhp: number;
    /**
     * The maximum HP restored by consuming this Item.
     */
    readonly maxhp: number;
    /**
     * The minimum MP restored by consuming this Item.
     */
    readonly minmp: number;
    /**
     * The maximum MP restored by consuming this Item.
     */
    readonly maxmp: number;
    /**
     * The number of daily uses remaining for this Item.
     */
    readonly dailyusesleft: number;
    /**
     * The notes that exist for this Item. Examples of (comma-separated) contents are:
     * 
     * *   The name and duration of any effects granted by consumption, if applicable.
     * *   Items dropped when this Item is consumed, if applicable.
     * *   Tags relevant to game mechanics (such as "MARTINI", "BEER" and "SAUCY")
     * *   "Unspaded"
     */
    readonly notes: string;
    /**
     * `true` if this Item is a quest item, else `false`.
     */
    readonly quest: boolean;
    /**
     * `true` if this Item is a gift item, else `false`.
     */
    readonly gift: boolean;
    /**
     * `true` if this Item is tradeable, else `false`.
     */
    readonly tradeable: boolean;
    /**
     * `true` if this Item is discardable, else `false`.
     */
    readonly discardable: boolean;
    /**
     * `true` if this Item usable in combat, else `false`. This returns `true` regardless of whether this Item is consumed when used in combat.
     */
    readonly combat: boolean;
    /**
     * `true` if this Item is usable in combat and is not consumed when doing so, else `false`.
     */
    readonly combat_reusable: boolean;
    /**
     * `true` if this Item is usable, else `false`. This returns `true` regardless of whether this Item is consumed when used.
     */
    readonly usable: boolean;
    /**
     * `true` if this Item is usable and is not consumed when doing so, else `false`.
     */
    readonly reusable: boolean;
    /**
     * `true` if more than one of this Item can be used at once, else `false`.
     */
    readonly multi: boolean;
    /**
     * `true` if this Item is a "fancy" ingredient, else `false`.
     */
    readonly fancy: boolean;
    /**
     * `true` if this Item is a meatpasting ingredient, else `false`.
     */
    readonly pasteable: boolean;
    /**
     * `true` if this Item is a meatsmithing ingredient, else `false`.
     */
    readonly smithable: boolean;
    /**
     * `true` if this Item is a cooking ingredient, else `false`.
     */
    readonly cookable: boolean;
    /**
     * `true` if this Item is a cocktailcrafting ingredient, else `false`.
     */
    readonly mixable: boolean;
    /**
     * `true` if this Item is a candy, else `false`.
     */
    readonly candy: boolean;
    /**
     * The candy type of this Item if it is a candy, or blank otherwise. Candy type can be one of "simple", "complex" or "unspaded".
     */
    readonly candy_type: string;
    /**
     * `true` if this Item is a chocolate, else `false`.
     */
    readonly chocolate: boolean;
    /**
     * Which Coinmaster sells this Item, if any.
     */
    readonly seller: Coinmaster;
    /**
     * Which Coinmaster buys this Item, if any.
     */
    readonly buyer: Coinmaster;
    /**
     * The length of this Item's display name.
     */
    readonly name_length: number;
    /**
     * The noob Skill granted by absorbing this Item.
     */
    readonly noob_skill: Skill;
}
declare class Location extends MafiaClass {
    /**
     * Nocombats
     */
    readonly nocombats: boolean;
    /**
     * Combat percent
     */
    readonly combat_percent: number;
    /**
     * Zone
     */
    readonly zone: string;
    /**
     * Parent
     */
    readonly parent: string;
    /**
     * Parentdesc
     */
    readonly parentdesc: string;
    /**
     * Environment
     */
    readonly environment: string;
    /**
     * Bounty
     */
    readonly bounty: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Combat queue
     */
    readonly combat_queue: string;
    /**
     * Noncombat queue
     */
    readonly noncombat_queue: string;
    /**
     * Turns spent
     */
    readonly turns_spent: number;
    /**
     * Kisses
     */
    readonly kisses: number;
    /**
     * Recommended stat
     */
    readonly recommended_stat: number;
    /**
     * Water level
     */
    readonly water_level: number;
    /**
     * Wanderers
     */
    readonly wanderers: boolean;
}
declare class Monster extends MafiaClass {
    /**
     * Name
     */
    readonly name: string;
    /**
     * Id
     */
    readonly id: number;
    /**
     * Base hp
     */
    readonly base_hp: number;
    /**
     * Base attack
     */
    readonly base_attack: number;
    /**
     * Raw hp
     */
    readonly raw_hp: number;
    /**
     * Raw attack
     */
    readonly raw_attack: number;
    /**
     * Raw defense
     */
    readonly raw_defense: number;
    /**
     * Base defense
     */
    readonly base_defense: number;
    /**
     * Base initiative
     */
    readonly base_initiative: number;
    /**
     * Raw initiative
     */
    readonly raw_initiative: number;
    /**
     * Attack element
     */
    readonly attack_element: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Defense element
     */
    readonly defense_element: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Physical resistance
     */
    readonly physical_resistance: number;
    /**
     * Min meat
     */
    readonly min_meat: number;
    /**
     * Max meat
     */
    readonly max_meat: number;
    /**
     * Min sprinkles
     */
    readonly min_sprinkles: number;
    /**
     * Max sprinkles
     */
    readonly max_sprinkles: number;
    /**
     * Base mainstat exp
     */
    readonly base_mainstat_exp: number;
    /**
     * Phylum
     */
    readonly phylum: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Poison
     */
    readonly poison: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Boss
     */
    readonly boss: boolean;
    /**
     * Copyable
     */
    readonly copyable: boolean;
    /**
     * Image
     */
    readonly image: string;
    /**
     * Images
     */
    readonly images: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Random modifiers
     */
    readonly random_modifiers: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Sub types
     */
    readonly sub_types: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Manuel name
     */
    readonly manuel_name: string;
    /**
     * Wiki name
     */
    readonly wiki_name: string;
    /**
     * Attributes
     */
    readonly attributes: string;
}
declare class Phylum extends MafiaClass {
    /**
     * Image
     */
    readonly image: string;
}
declare class Servant extends MafiaClass {
    /**
     * Id
     */
    readonly id: number;
    /**
     * Name
     */
    readonly name: string;
    /**
     * Level
     */
    readonly level: number;
    /**
     * Experience
     */
    readonly experience: number;
    /**
     * Image
     */
    readonly image: string;
    /**
     * Level1 ability
     */
    readonly level1_ability: string;
    /**
     * Level7 ability
     */
    readonly level7_ability: string;
    /**
     * Level14 ability
     */
    readonly level14_ability: string;
    /**
     * Level21 ability
     */
    readonly level21_ability: string;
}
declare class Skill extends MafiaClass {
    /**
     * Name
     */
    readonly name: string;
    /**
     * Type
     */
    readonly type: string;
    /**
     * Level
     */
    readonly level: number;
    /**
     * Image
     */
    readonly image: string;
    /**
     * Traincost
     */
    readonly traincost: number;
    /**
     * Class
     */
    readonly class: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Libram
     */
    readonly libram: boolean;
    /**
     * Passive
     */
    readonly passive: boolean;
    /**
     * Buff
     */
    readonly buff: boolean;
    /**
     * Combat
     */
    readonly combat: boolean;
    /**
     * Song
     */
    readonly song: boolean;
    /**
     * Expression
     */
    readonly expression: boolean;
    /**
     * Walk
     */
    readonly walk: boolean;
    /**
     * Summon
     */
    readonly summon: boolean;
    /**
     * Permable
     */
    readonly permable: boolean;
    /**
     * Dailylimit
     */
    readonly dailylimit: number;
    /**
     * Timescast
     */
    readonly timescast: number;
}
declare class Thrall extends MafiaClass {
    /**
     * Id
     */
    readonly id: number;
    /**
     * Name
     */
    readonly name: string;
    /**
     * Level
     */
    readonly level: number;
    /**
     * Image
     */
    readonly image: string;
    /**
     * Tinyimage
     */
    readonly tinyimage: string;
    /**
     * Skill
     */
    readonly skill: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Current modifiers
     */
    readonly current_modifiers: string;
}
declare class Vykea extends MafiaClass {
    /**
     * Id
     */
    readonly id: number;
    /**
     * Name
     */
    readonly name: string;
    /**
     * Type
     */
    readonly type: string;
    /**
     * Rune
     */
    readonly rune: net.sourceforge.kolmafia.textui.parsetree.Value;
    /**
     * Level
     */
    readonly level: number;
    /**
     * Image
     */
    readonly image: string;
    /**
     * Modifiers
     */
    readonly modifiers: string;
    /**
     * Attack element
     */
    readonly attack_element: net.sourceforge.kolmafia.textui.parsetree.Value;
}

