
function Player( picture, name ) {
  this.picture = picture;
  this.name = name;
  this.hp = 100;

  this.weapon = null;
  this.armor = null;
  this.ability = null;
  this.coding = null;
}

const WEAPONS = [
  {name:"Butter Knife",power:1},
  {name:"Chainsaw",power:8},
  {name:"Hammer",power:3},
  {name:"Gabe's Samurai Sword",power:10},
  {name:"Water Gun",power:1},
  {name:"Nuke",power:9},
  {name:"Revolver",power:4},
  {name:"Musket",power:5}
];
const ARMORS = [
  {name:"Joe's Plaid Shirt",power:10},
  {name:"Life Jacket",power:4},
  {name:"Fullstack T-Shirt",power:1},
  {name:"Leather Jacket",power:5},
  {name:"Steel Fleece",power:7},
  {name:"Diaper of Courage",power:1},
  {name:"Hoodie",power:3},
  {name:"Burlap Sack",power:2}
];
const MAGICS = [
  "Super Fast Wi-Fi",
  "Really Tall",
  "Slippery",
  "Can Stay Awake During Fullstack Lectures",
  "Talks Very Fast",
  "Smells Good",
  "Sweats Less Than Average",
  "Never Needs to Sleep",
  "Not Allergic to Anything"
];
const CODINGS = [
  "Hacker",
  "Google Engineer",
  "Fullstack Instructor",
  "Fullstack Student",
  "Kyu 4",
  "Nerd",
  "n00b",
  "Dad With a Twitter Account",
  "Tech Savvy Grandma"
];

function uidToInt( uid ) {
  var val = 0;
  for (var i=0; i<uid.length; i+=2) {
    val *= Math.pow(2,i);
    if (uid.charCodeAt(i) < 58) val += Number(uid[i]);
    else val += uid.charCodeAt(i) - 96;
    if (uid.charCodeAt(i+1) < 58) val += Number(uid[i+1]);
    else val += uid.charCodeAt(i+1) - 96;
    console.log( val );
  }
  return val;
}

function uidToRandomNums( uid ) {
  var n = uidToInt( uid );
  console.log( n );

  return [ Math.floor( n / 2 ),
           Math.floor( n / 3 ),
           Math.floor( n / 5 ),
           Math.floor( n / 7 ) ];
}

Array.prototype.pickRandom = function( num ) {
  return this[num % this.length];
}

// Sets the player's items
Player.prototype.setItems = function( uid ) {
  var nums = uidToRandomNums( uid );
  this.weapon = WEAPONS.pickRandom( nums[0] );
  this.armor = ARMORS.pickRandom( nums[1] );
  this.ability = MAGICS.pickRandom( nums[2] );
  this.coding = CODINGS.pickRandom( nums[3] );

  console.log( this.weapon.name, this.armor.name, this.ability, this.coding );
}

function diceRoll( uid ) {
  var n = uidToInt( uid );
  return (n % 6) + 1;
}

// Rolls dice with a UID to generate a player's damage
Player.prototype.getDamageFromDiceroll = function( uid ) {
  return diceRoll( uid ) * this.weapon.power;
}

// Deals damage to a player
Player.prototype.dealDamage = function( damage ) {
  this.hp -= Math.max(1, damage - (this.armor.power / 2));
}

// Checks if a player is dead
Player.prototype.isDead = function() {
  return this.hp <= 0;
}

module.exports = Player;
