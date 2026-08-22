## Troubleshooting

Search keywords: NP100, program controller, temperature error, noise, settings reset, alarm, relay life, burnout

> ℹ The symptoms/actions below are built from the causes listed in the manufacturer manual's "1. Safety Precautions" section.

### Symptom: Settings changed on their own after repeated power ON/OFF (malfunction)

**Possible Cause**
- In a circuit that switches power frequently, switch chattering reset the microcomputer's stored values
- Malfunction caused by strong external noise

**Inspection**
- [ ] Check whether the controller's control power is wired directly into a circuit that switches ON/OFF frequently
- [ ] Check whether the power leads are tightly twisted and whether a noise filter/isolation transformer is in use

**Corrective Action**
1. Rewire the controller's power to a stable supply line, not a frequently switched circuit
2. In noisy environments, add an isolation transformer and noise filter (ground the filter to the panel, keep filter-output wiring short)
3. Always re-verify all settings after power is restored

---

### Symptom: The displayed temperature deviates from the actual temperature

**Possible Cause**
- Ordinary wire used for thermocouple input instead of the specified compensating lead wire
- RTD 3-wire lead resistances differ between wires, or lead resistance is too high
- Cold-junction compensation (rJC) is set to OFF (for thermocouple input)

**Inspection**
- [ ] Check whether the thermocouple wiring uses the specified compensating lead wire
- [ ] Measure whether the RTD's 3 lead wires have matching resistance
- [ ] Check the rJC (temperature compensation) setting in the Input Setting Group

**Corrective Action**
1. Rewire using compensating lead wire
2. Replace RTD leads with low-resistance wire that has no resistance difference between the 3 leads
3. Set rJC to ON for thermocouple input

---

### Symptom: Alarms (AL1/AL2) trip at the wrong time, or don't trip at all

**Possible Cause**
- Alarm type (A1TY/A2TY) or setpoint (AL-1/AL-2) doesn't match actual operating conditions
- Wrong choice between normal and reverse alarm logic (with reverse logic, output is OFF while the indicator lamp is ON)

**Inspection**
- [ ] Check the type, setpoint, and dead band in the Alarm Setting Group (G.ALn)
- [ ] Confirm the normal/reverse alarm code (e.g. 1-10 vs. 5, 6, 9, 10) matches intent
- [ ] Test alarm operation before putting the unit into service

**Corrective Action**
1. Reconfigure the alarm type and setpoint
2. Re-verify normal/reverse output logic and change the code if needed

---

### Symptom: Relay contact output wears out quickly (frequent contact failure)

**Possible Cause**
- Load connected directly to the relay contact with no margin under high-frequency proportional switching

**Inspection**
- [ ] Check the heating cycle time (Ct) setting (recommended 20+ sec for electromagnetic contactors, 1+ sec for SSR)
- [ ] Check the load is within the relay contact rating (240V AC 3A or 30V DC 3A, resistive load)

**Corrective Action**
1. Switch the load through an auxiliary relay
2. Switch to an SSR-driven output type where possible
3. Add a CR filter (AC) or diode (DC) across inductive loads

---

### Symptom: Heater-burnout alarm doesn't work correctly

**Possible Cause**
- Heater power and controller power are wired from different power lines

**Inspection**
- [ ] When using the heater-burnout alarm, confirm heater power and controller (control) power are branched from the same power line

**Corrective Action**
1. Rewire heater power and controller power to the same power line

---

### Symptom: PV display is pinned to the max or min value (burnout)

**Possible Cause**
- Sensor (thermocouple/RTD) open circuit
- Burnout action (boUt) set to UP or DOWN combined with an actual open circuit

**Inspection**
- [ ] Measure sensor wiring for an open circuit
- [ ] Check the boUt setting in the Input Setting Group (OFF/UP/DOWN)

**Corrective Action**
1. Replace the broken sensor or wiring
2. Check the wiring route and mounting to prevent recurrence

---

### Symptom: Control behavior changed after swapping in a spare unit

**Possible Cause**
- Even with the same model, individual units can have different stored parameters

**Inspection**
- [ ] Compare the full Engineering mode/Program mode settings before and after the swap

**Corrective Action**
1. Before swapping, record the old unit's full parameter set using the "12. Program Setting Chart," then apply the same settings to the replacement
2. Confirm compatibility before resuming operation
