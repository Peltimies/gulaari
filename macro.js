// Tag Setup:
// Tag the trap tile with "Fire Trap"
// Tag the trigger tile with "Fire Trap Trigger"

const trapTile = await Tagger.getByTag('Fire Trap')[0];
const location = await Tagger.getByTag('Fire Trap Trigger')[0];

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

// Trap Effect
new Sequence()
    .effect()
    .file("jb2a.breath_weapons02.burst.cone.fire.orange.02")
    .atLocation(trapTile)
    .size(3.5, {gridUnits:true})
    .rotateTowards(location)
    .zIndex(1)
    .play();

// Saving throw mechanics
const dcSave = 15;  // Adjust DC as needed
const damageRoll = "1d6";  // Adjust damage as needed

// Roll the save using basic d20 roll
const saveRoll = await new Roll(`1d20 + ${dexMod}`).evaluate({async: true});
const saveTotal = saveRoll.total;
const isSuccess = saveTotal >= dcSave;

// Show the save roll in chat
saveRoll.toMessage({
    speaker: ChatMessage.getSpeaker({alias: "Fire Trap"}),
    flavor: `${triggeringToken.name} - Dexterity Save (DC ${dcSave})`
});

// Roll damage
let damageRollResult = await new Roll(damageRoll).evaluate({async: true});

// Process results based on save success/failure
if (!isSuccess) {
    // Failed save - full damage
    const damage = damageRollResult.total;
    const newHP = triggeringToken.actor.system.attributes.hp.value - damage;
    await triggeringToken.actor.update({
        'system.attributes.hp.value': newHP
    });
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({alias: "Fire Trap"}),
        content: `${triggeringToken.name} failed their save (${saveTotal} vs DC ${dcSave}) and takes ${damage} fire damage!`
    });

    
    // Visual effect
    new Sequence()
        .wait(500)
        .effect()
        .from(triggeringToken)
        .attachTo(triggeringToken)
        .scaleToObject(1, {considerTokenScale: true})
        .fadeIn(250)
        .fadeOut(750)
        .loopProperty("sprite", "position.x", { 
            from: -0.05, 
            to: 0.05, 
            duration: 50, 
            pingPong: true, 
            gridUnits: true
        })
        .duration(2000)
        .opacity(0.25)
        .play();

    // Apply full damage
    await triggeringToken.actor.applyDamage(damageRollResult.total);
} else {
    // Successful save - half damage
    const halfDamage = Math.floor(damageRollResult.total / 2);
    const newHP = triggeringToken.actor.system.attributes.hp.value - halfDamage;
    await triggeringToken.actor.update({
        'system.attributes.hp.value': newHP
    });



    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({alias: "Fire Trap"}),
        content: `${triggeringToken.name} succeeded their save (${saveTotal} vs DC ${dcSave}) and takes ${halfDamage} fire damage! `
    });
    
  
}

// Show damage roll in chat
damageRollResult.toMessage({
    speaker: ChatMessage.getSpeaker({alias: "Fire Trap"}),
    flavor: `Fire Trap Damage (DC ${dcSave} DEX save)`
});