# Inspection

> ⚠ **Electrical Hazard** — Power OFF and LOTO before opening any terminal box.

## Checklist

- [ ] Power OFF confirmed (LOTO applied)
- [ ] Connector fully seated, no corrosion on pins
- [ ] Cable jacket undamaged, no chafe points along cable run
- [ ] Mounting bolts tight (no visible movement/play at flange)
- [ ] Coupling/bellows shows no cracking or backlash
- [ ] Housing free of mechanical damage, dents, or cracked cover
- [ ] Sensor signal present on PLC diagnostic screen (pulse count changes when boom moves)
- [ ] No moisture or oil ingress inside terminal box

## Result

`Normal` / `Abnormal` — record on FSR report and note which checklist item failed.

## Notes

- Rotate the boom slowly through a small angle and confirm the PLC angle value changes smoothly, without jumps or dropouts.
- A signal that freezes at a fixed value with boom moving indicates a broken coupling or open A/B channel — see **Troubleshooting**.
