// Tag Setup:
// Tag the trap tile with "Javelin Trap"
// Tag the trigger tile with "Javelin Trap Trigger"

const trapTile = await Tagger.getByTag('Javelin Trap')[0];
const location = await Tagger.getByTag('Javelin Trap Trigger')[0];

if (!trapTile || !location) {
    ui.notifications.error("Could not find trap or trigger tiles. Make sure they are tagged properly.");
    return;
}

// Get the triggering token/actor
let triggeringToken = canvas.tokens.placeables.find(t => 
    t.document.x === location.object.x && 
    t.document.y === location.object.y
);

if (!triggeringToken) {
    ui.notifications.warn("No token found at trigger location");
    return;
}

// Get the character's DEX modifier
const dexMod = triggeringToken.actor.system.abilities.dex.mod;

// Saving throw mechanics
const dcSave = 12;  // Adjust DC as needed
const damageRoll = "1d6";  // Adjust damage as needed

// Roll the save using basic d20 roll
const saveRoll = await new Roll(`1d20 + ${dexMod}`).evaluate({async: true});
const saveTotal = saveRoll.total;
const isSuccess = saveTotal >= dcSave;

// Show the save roll in chat
saveRoll.toMessage({
    speaker: ChatMessage.getSpeaker({alias: "Javelin Trap"}),
    flavor: `${triggeringToken.name} - Dexterity Save (DC ${dcSave})`
});

// Javelin animation
await new Sequence()
    .effect()
    .file("jb2a.javelin.01.throw")
    .atLocation(trapTile)
    .stretchTo(triggeringToken)
    .play();

// Process results based on save success/failure
if (!isSuccess) {
    // Failed save - full damage
    let damageRollResult = await new Roll(damageRoll).evaluate({async: true});
    const damage = damageRollResult.total;
    const newHP = triggeringToken.actor.system.attributes.hp.value - damage;
    
    await triggeringToken.actor.update({
        'system.attributes.hp.value': newHP
    });
    
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({alias: "Javelin Trap"}),
        content: `${triggeringToken.name} failed their save (${saveTotal} vs DC ${dcSave}) and takes ${damage} piercing damage!`
    });

    // Hit effect
    new Sequence()
        .effect()
        .file("jb2a.liquid.splash_side.red")
        .atLocation(triggeringToken)
        .size((1.5 * triggeringToken.document.width) * triggeringToken.document.texture.scaleX, {gridUnits:true})
        .spriteOffset({x:-0.25}, {gridUnits:true})
        .rotateTowards(trapTile)
        .play();
} else {
    // Successful save - dodge
    // Calculate vector from trap to token
    const dx = triggeringToken.x - trapTile.object.x;
    const dy = triggeringToken.y - trapTile.object.y;
    
    // Normalize the vector
    const length = Math.sqrt(dx * dx + dy * dy);
    const normalizedX = dx / length;
    const normalizedY = dy / length;
    
    // Calculate perpendicular vector (for dodge direction)
    const perpX = -normalizedY;
    const perpY = normalizedX;
    
    // Calculate dodge position (half a grid unit to the side)
    const dodgeDistance = canvas.grid.size * 1;
    const newX = triggeringToken.x + (perpX * dodgeDistance);
    const newY = triggeringToken.y + (perpY * dodgeDistance);
    
    // Animate the dodge
    new Sequence()
        .animation()
        .on(triggeringToken)
        .moveTowards({x: newX, y: newY})
        .play();

    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({alias: "Javelin Trap"}),
        content: `${triggeringToken.name} successfully dodged the javelin! (${saveTotal} vs DC ${dcSave})`
    });
}

// Show damage roll in chat if damage was dealt
if (!isSuccess) {
    damageRollResult.toMessage({
        speaker: ChatMessage.getSpeaker({alias: "Javelin Trap"}),
        flavor: `Javelin Damage (DC ${dcSave} DEX save)`
    });
}