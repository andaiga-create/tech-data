# PVG 32 Troubleshooting

## 1. Unintended movement in neutral / LS pressure rises
### Check
1. PVBS spool type
2. PVE actuator type
3. Especially Linear Characteristic PVBS + PVEM combination
4. Neutral command / mechanical centering
5. Pilot pressure

### Important
The catalog states that Linear Characteristic PVBS must not be used with PVEM. The small spool dead band combined with PVEM 20% hysteresis can create LS pressure in neutral.

## 2. Crane hunting / oscillation
### Possible causes
- LS system instability
- High inertia torque
- Secondary pressure-controlled components such as over-center valves
- Application requiring a pressure-control spool

### Check
- Whether the function is slewing or main lifting/lowering
- Load-pressure variation
- Pressure-control spool configuration
- PVB pressure compensator
- LSA/B pressure-limiting settings

## 3. Low flow / slow movement
Check in this order:
1. Pump flow
2. P pressure
3. LS pressure
4. Spool stroke / command
5. PVB pressure compensator
6. Filter contamination
7. A/B restriction
8. PVBS spool size

## 4. Excessive pressure
- Check PVP relief setting
- Check PVLP / LSA/B setting relationship
- Check closed-center pump standby pressure
- Check PVPX LS unloading operation

## 5. Cavitation / shock
- Check PVLA suction valve
- Check PVLP shock/suction valve
- Check return/T pressure
- Check over-center valve and load condition

## 6. PVE fault
Check:
- Supply voltage
- Connector
- Pilot oil pressure
- Fault output / LED
- Spool feedback
- CAN wiring(PVED)

> This is a field diagnostic reference. Final root-cause determination requires the hydraulic schematic, actual measurements and installed configuration.
