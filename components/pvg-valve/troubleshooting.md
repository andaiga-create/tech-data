# Troubleshooting

**Keywords:** Slow Response, Function Drift, No Movement, Jerky Movement, Amplifier Card Error

---

## Case 1 — Function Does Not Move / No Response

**Problem**
Joystick input given but crane function does not move (other functions normal).

**Possible Cause**
- PVEH coil open circuit or disconnected
- Amplifier card output fault for that section
- Spool stuck (contamination or mechanical damage)
- No pilot pressure reaching section

**Inspection**
1. Measure PVEH coil resistance (should read per datasheet, typically 5–8 Ω).
2. Check for output signal from amplifier card at connector (with joystick deflected).
3. Try manual override pin on the section — if function moves manually, electrical/signal fault confirmed.
4. Check pilot pressure gauge at valve inlet.

**Corrective Action**
- Coil open/out of spec → replace PVEH coil.
- No amplifier output → check card fuse, replace amplifier card if faulty.
- Manual override does not move spool → spool contamination/seizure, remove section for cleaning or replace.
- No pilot pressure → check pilot filter and pilot pump/reducing valve.

**Final Check**
Confirm smooth proportional response through full joystick range, no other functions affected.

---

## Case 2 — Function Drifts at Neutral

**Problem**
Boom/load creeps slowly with joystick at neutral (not caused by load-holding valve — isolate first).

**Possible Cause**
- Spool not returning fully to center (contamination, worn spool)
- PVEH coil residual current (amplifier zero offset drifted)
- Deadband set too narrow

**Inspection**
1. Confirm 0 mA at amplifier output with joystick at neutral.
2. Check spool return spring and manual override pin returns fully.
3. Compare against **Setting** deadband value.

**Corrective Action**
- Non-zero current at neutral → recalibrate amplifier zero offset.
- Spool not returning → clean/inspect spool bore, check for contamination in oil.
- Widen deadband slightly within acceptance range if marginal creep persists.

**Final Check**
Confirm zero drift over a 5-minute static hold test with rated load.
