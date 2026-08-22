## Troubleshooting

Search keywords: Load Limiter, JDL-100, JDLS-70, overload protector, power won't turn on, alarm, CT open circuit

> ℹ The symptoms/actions below are based on the manufacturer manual's "12. User Training Checklist" table.

### Symptom: Power doesn't turn on

**Possible Cause**
- Main or control power not supplied
- Open circuit or poor contact in wiring

**Inspection**
- [ ] Check main and control power supply
- [ ] Check wiring for open circuits or poor contact

**Corrective Action**
1. Re-check and re-terminate power wiring
2. Repair the open circuit/poor contact, then restart

---

### Symptom: Alarm sounds during normal operation

**Possible Cause**
- Incorrect setting (overload current set lower than the actual load)
- Genuine motor or mechanical defect (an actual overload condition exists)

**Inspection**
- [ ] Check whether the L/H current settings suit the actual motor rating and load conditions
- [ ] Check the motor and hoisting mechanism for mechanical defects (seized bearing, excessive friction, etc.)

**Corrective Action**
1. Re-adjust the setting if it's inappropriate
2. Repair or replace any defective part found

---

### Symptom: External function switches (L/H test, Reset, etc.) don't work properly

**Possible Cause**
- Poor switch contact
- Moisture or oil ingress inside the case

**Inspection**
- [ ] Check switch contact condition
- [ ] Check for moisture, contamination, or oil ingress inside the case

**Corrective Action**
1. Request A/S (JUNGHO Engineering)
2. If it still doesn't work after removing moisture/oil, request A/S

---

### Symptom: No current display

**Possible Cause**
- Open circuit or poor contact in the CT wiring

**Inspection**
- [ ] Check CT wiring condition and measure for an open circuit

**Corrective Action**
1. Request A/S (the CT itself and its wiring need inspection)

---

### Symptom: Power is on but the hoist doesn't operate

**Possible Cause**
- Abnormal control voltage
- Wrong position of the control-voltage selector tap (48V/110V or 110V/220V)

**Inspection**
- [ ] Measure whether control voltage is within normal range
- [ ] Check the voltage-selector tap position matches the actual supply voltage

**Corrective Action**
1. Request A/S

---

### Symptom: TRIP state doesn't clear even after pressing RESET

**Possible Cause**
- The actual overload condition hasn't cleared yet
- Retried before the reset time has elapsed

**Inspection**
- [ ] Check whether the actual load/current has dropped below the setting
- [ ] Check whether the configured reset time has elapsed

**Corrective Action**
1. Resolve the overload cause first (e.g. excess load)
2. Retry RESET after the reset time has elapsed
