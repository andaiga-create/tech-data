## Overview

The Load Limiter is an overload limiter/protector made by **JUNGHO ENGINEERING, CO.** It detects AC motor phase current through a current transformer (CT) and, when an overload condition is judged, energizes a relay to cut power to the motor via a magnetic contactor or breaker.

This reference is based on the **JDL-100 / JDLS-70** models, used to protect hoisting motors on electric hoists and cranes from shock and overload — marketed as "SafeGuard for electric hoist & cranes."

> ⚠ This device is a digital circuit built around a microcomputer and EEPROM. Strong external noise or repeated power ON/OFF cycling can reset the settings to their initial state or cause malfunction. In environments where power is switched frequently, always re-verify the set values before work. Only the authorized handler or safety manager should adjust settings.

### Key functions

- Detects motor phase current via CT and judges overload condition
- Reset-time delay function — auto resets if the hoist/crane descends within the same time window
- Digital fine setting of operating time and current
- For two-speed (creep) hoists, separate current settings and TRIP identification for low speed (L) and high speed (H)
- Displays the running motor current itself (no separate ammeter needed)
- Clear overload indication via LED flashing + buzzer on trip
- Simple wiring/installation using an external CT
- Separable Main Control PCB / Power PCB connectors for easy service
- Can also be used as an over-current relay for AC motor protection

### Mounting location

Bracket-mounted horizontally or vertically near the crane/hoist control panel, taking its input from a CT (current transformer) installed on the hoisting motor line.
