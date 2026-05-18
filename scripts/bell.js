Hooks.once("init", () => {
  game.settings.register("login-bell", "volume", {
    name: "Simple Login Bell",
    hint: "Volume of the login notification bell (0 to mute).",
    scope: "client",
    config: true,
    type: Number,
    range: { min: 0, max: 1, step: 0.1 },
    default: 0.5,
  });
});

Hooks.on("userConnected", (user, connected) => {
  if (!connected) return;
  if (user.isSelf) return;

  const vol = game.settings.get("login-bell", "volume");
  if (vol > 0) playBell(vol);
});

function playBell(volume) {
  try {
    AudioHelper.play({ src: "sounds/notify.wav", volume, loop: false }, false);
  } catch (e) {
    console.error("Login Bell | Failed to play sound:", e);
  }
}
