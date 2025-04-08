(() => {
    // Pit Trap Effect Macro
    // Last Updated: 27/3/2025
    // Original Author: eskiemoh#2969

    // Get the triggering token and any targeted tokens
    const triggerToken = canvas.tokens.controlled[0];
    const targetedTokens = Array.from(game.user.targets);
    const tokensToAffect = new Set([...targetedTokens]);

    // Add the triggering token if it exists
    if (triggerToken) {
        tokensToAffect.add(triggerToken);
    }

    // Check if we have any tokens to affect
    if (tokensToAffect.size === 0) {
        ui.notifications.warn("Please either select a token or target tokens to affect");
        return;
    }

    // Process each token
    tokensToAffect.forEach(async (token) => {
        // Create the full animation sequence
        new Sequence()
            // Initial fade out effect
            .effect()
            .from(token)
            .attachTo(token, { bindAlpha: false })
            .scaleToObject(1, { considerTokenScale: true })
            .fadeOut(750, { ease: "easeOutCubic" })
            .duration(1500)
            .scaleOut(0, 1000, { ease: "easeOutCubic" })
            .opacity(1)

            // Fade token
            .animation()
            .delay(200)
            .on(token)
            .opacity(0)

            // Add smoke effect
            .effect()
            .file("jb2a.smoke.puff.ring.01.white.1")
            .atLocation(token)
            .scale(1.5)
            .opacity(0.8)

            .wait(1500)

            // Add fallen token effect
            .effect()
            .name(`${token.document.name} Fallen`)
            .from(token)
            .attachTo(token, {
                offset: { y: -0.4 * token.document.width },
                gridUnits: true,
                bindAlpha: false
            })
            .scaleToObject(0.3, { considerTokenScale: false })
            .scaleIn(0, 500, { ease: "easeOutBack" })
            .opacity(0.9)
            .aboveLighting()
            .persist()
            .zIndex(1)

            // Add chevron indicator
            .effect()
            .name(`${token.document.name} Fallen`)
            .file("icons/pings/chevron.webp")
            .attachTo(token, {
                offset: {
                    y: -0.4 * token.document.width + 0.2 * token.document.width
                },
                gridUnits: true,
                bindAlpha: false
            })
            .scaleToObject(0.25, { considerTokenScale: false })
            .scaleIn(0, 500, { ease: "easeOutBack" })
            .loopProperty("sprite", "position.y", {
                from: 0,
                to: 0.025,
                duration: 1500,
                pingPong: true,
                gridUnits: true,
                ease: "easeInSine"
            })
            .tint(game.user.color.css)
            .opacity(0.9)
            .aboveLighting()
            .persist()
            .waitUntilFinished()

            // Cleanup effects
            .thenDo(() => {
                Sequencer.EffectManager.endEffects({
                    name: `${token.document.name} Fallen`,
                    object: token
                });
            })

            // Restore token visibility with new scale
            .animation()
            .on(token)
            .opacity(1)

            // Play the sequence
            .play();

        // Update token size
        try {
            await token.document.update({
                width: token.document.width * 0.3,
                height: token.document.height * 0.3
            });
        } catch(err) {
            console.error("Failed to shrink token:", err);
        }

        // Show a notification instead of chat message
        ui.notifications.info(`${token.name} fell into the pit`);
    });
})();